import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { HealthController } from "../health/health.controller";

describe("App E2E Tests", () => {
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

  describe("Health Check", () => {
    it("should return health status", async () => {
      const response = await request(app.getHttpServer())
        .get("/health")
        .expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("ok");
    });

    it("should return 200 status code", async () => {
      await request(app.getHttpServer()).get("/health").expect(200);
    });

    it("should have correct response structure", async () => {
      const response = await request(app.getHttpServer())
        .get("/health")
        .expect(200);

      expect(response.body).toEqual({
        status: "ok",
      });
    });
  });

  describe("Application Status", () => {
    it("should be running", () => {
      expect(app).toBeDefined();
      expect(app.getHttpServer()).toBeDefined();
    });

    it("should have health endpoint available", async () => {
      const response = await request(app.getHttpServer())
        .get("/health")
        .expect(200);

      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
  });
});
