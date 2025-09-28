import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { HealthController } from "../../health/health.controller";

describe("Health API Tests", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app.getHttpServer())
        .get("/health")
        .expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("ok");
    });
  });
});
