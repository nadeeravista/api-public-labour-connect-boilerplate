import { createKnexMock } from "../mocks/knex.mock";

/**
 * Enhanced test database setup with proper mocking
 */
export const setupTestDatabase = () => {
  const mockKnex = createKnexMock();

  // Add table-specific methods that return proper mock data
  const tableMethods = {
    user: () => mockKnex,
    customer: () => mockKnex,
    provider: () => mockKnex,
    city: () => mockKnex,
  };

  // Add table methods to the main knex mock
  Object.assign(mockKnex, tableMethods);

  return mockKnex;
};

/**
 * Mock user data factory
 */
export const createMockUser = (
  overrides: Partial<UserMockData> = {},
): UserMockData => ({
  id: "user_123",
  auth0Id: "auth0|123456789",
  email: "test@example.com",
  name: "Test User",
  role: ["user"],
  customerId: null,
  providerId: null,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

/**
 * Mock customer data factory
 */
export const createMockCustomer = (
  overrides: Partial<CustomerMockData> = {},
): CustomerMockData => ({
  id: "customer_123",
  userId: "user_123",
  name: "Test Customer",
  email: "customer@example.com",
  phone: "+1234567890",
  address: "123 Test St",
  city: "Test City",
  status: "active" as const,
  registrationDate: "2024-01-01T00:00:00.000Z",
  totalRequests: 0,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

/**
 * Mock provider data factory
 */
export const createMockProvider = (
  overrides: Partial<ProviderMockData> = {},
): ProviderMockData => ({
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
  status: "active" as const,
  registrationDate: "2024-01-01T00:00:00.000Z",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

/**
 * Mock city data factory
 */
export const createMockCity = (
  overrides: Partial<CityMockData> = {},
): CityMockData => ({
  id: "city_123",
  name: "Test City",
  state: "Test State",
  country: "Test Country",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  ...overrides,
});

/**
 * Type definitions for mock data
 */
export interface UserMockData {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  role: string[];
  customerId: string | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerMockData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: "active" | "inactive" | "suspended";
  registrationDate: string;
  totalRequests: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderMockData {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  address: string;
  town: string;
  city: string;
  country: string;
  status: "active" | "inactive" | "suspended";
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityMockData {
  id: string;
  name: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Helper function to create paginated mock responses
 */
export const createPaginatedResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10,
  total: number = data.length,
) => ({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});

/**
 * Helper function to create mock database responses
 */
export const createMockDatabaseResponse = {
  success: (data: any) => ({ success: true, data }),
  error: (message: string, code: string = "ERROR") => ({
    success: false,
    error: { message, code },
  }),
  notFound: () => ({
    success: false,
    error: { message: "Resource not found", code: "NOT_FOUND" },
  }),
};
