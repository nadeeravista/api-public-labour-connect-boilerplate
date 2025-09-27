import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import * as bodyParser from "body-parser";

dotenv.config();

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const logLevels = isDevelopment
    ? ["error", "warn", "log", "debug", "verbose"]
    : ["error", "warn", "log"];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels as any,
    bodyParser: false,
  });

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  if (isDevelopment) {
    Logger.log(
      "🔧 Debug logging enabled for development environment",
      "Bootstrap",
    );

    app.use((req: any, res: any, next: any) => {
      Logger.debug(`${req.method} ${req.url}`, "HTTP");
      next();
    });
  }

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Labour Connect API")
    .setDescription(
      "A RESTful API for Labour Connect platform built with NestJS, Knex.js, and TypeScript",
    )
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  writeFileSync(
    join(process.cwd(), "openapi.json"),
    JSON.stringify(document, null, 2),
  );

  const port = process.env.PORT || 4004;
  await app.listen(port);

  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log(`📦 Assets API: http://localhost:${port}/assets`);
  console.log(`⚙️  Settings API: http://localhost:${port}/settings`);
  console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
  console.log(`📦 API spec: http://localhost:${port}/api-docs-json`);
}
bootstrap();
