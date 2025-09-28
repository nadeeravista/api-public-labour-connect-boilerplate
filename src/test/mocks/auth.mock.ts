import { Request } from "express";

export const createMockRequest = (
  overrides: Partial<Request> = {},
): Partial<Request> => ({
  user: {
    id: "user_123",
    auth0Id: "auth0|123456789",
    email: "test@example.com",
    name: "Test User",
  },
  headers: {
    authorization: "Bearer mock-jwt-token",
  },
  body: {},
  params: {},
  query: {},
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: "user_123",
  auth0Id: "auth0|123456789",
  email: "test@example.com",
  name: "Test User",
  created_at: "2024-01-01T00:00:00.000Z",
  updated_at: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

export const createMockCustomer = (overrides = {}) => ({
  id: "customer_123",
  userId: "user_123",
  name: "Test Customer",
  email: "customer@example.com",
  phone: "+1234567890",
  address: "123 Test St",
  city: "Test City",
  status: "active",
  registrationDate: "2024-01-01T00:00:00.000Z",
  totalRequests: 0,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

export const createMockProvider = (overrides = {}) => ({
  id: "provider_123",
  userId: "user_123",
  name: "Test Provider",
  email: "provider@example.com",
  phone: "+1234567890",
  profession: "Electrician",
  address: "456 Provider St",
  town: "Provider Town",
  city: "Provider City",
  country: "USA",
  status: "active",
  registrationDate: "2024-01-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});
