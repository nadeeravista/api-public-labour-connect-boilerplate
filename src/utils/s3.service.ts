import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  constructor() {
    const s3Client = new S3Client({
      endpoint: process.env.AWS_S3_ENDPOINT,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
    });

    this.s3Client = s3Client;
  }

  async uploadFile(file: {
    originalname: string;
    fieldname: string;
    buffer: Buffer;
  }) {
    const uuid = uuidv4();
    const fileExtension = file.originalname.split(".").pop();
    const uniqueKey = `${file.fieldname}_${uuid}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueKey,
      Body: file.buffer,
      ACL: "public-read",
    });

    let cid = "";
    command.middlewareStack.add(
      (next) => async (args) => {
        // Check if request is incoming as middleware works both ways
        const response = await next(args);
        // @ts-expect-error - AWS SDK response type doesn't include statusCode
        if (!response.response.statusCode) return response;

        // @ts-expect-error - AWS SDK response type doesn't include headers
        cid = response.response.headers["x-amz-meta-cid"] || "";
        return response;
      },
      {
        step: "build",
        name: "addCidToOutput",
      },
    );

    await this.s3Client.send(command);

    return {
      url: `${process.env.AWS_S3_FILE_PUBLIC_BASE_PATH}/${cid}`,
      key: uniqueKey, // Use unique key for deletion
    };
  }

  async deleteFileByKey(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    await this.s3Client.send(command);
  }
}
