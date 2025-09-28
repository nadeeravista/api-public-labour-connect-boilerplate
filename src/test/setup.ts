import "reflect-metadata";
import { config } from "dotenv";

// Load environment variables from .env.test
config({ path: ".env.test" });

// Mock uuid module
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid-123"),
}));

// Mock NestJS Logger to prevent console output during tests
jest.mock("@nestjs/common", () => ({
  ...jest.requireActual("@nestjs/common"),
  Logger: Object.assign(
    jest.fn().mockImplementation(() => ({
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    })),
    {
      overrideLogger: jest.fn(),
    },
  ),
}));

// Global test setup
beforeAll(async () => {
  // Setup code that runs before all tests
});

afterAll(async () => {
  // Cleanup code that runs after all tests
});

beforeEach(() => {
  // Setup code that runs before each test
});

afterEach(() => {
  // Cleanup code that runs after each test
});
