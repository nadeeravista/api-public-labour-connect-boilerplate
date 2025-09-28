// Mock JWT tokens for testing
export const MOCK_TOKENS = {
  USER: "Bearer mock-user-jwt-token",
  ADMIN: "Bearer mock-admin-jwt-token",
  INVALID: "Bearer invalid-token",
  EXPIRED: "Bearer expired-token",
};

// Mock user data for different scenarios
export const MOCK_USERS = {
  REGULAR_USER: {
    id: "user_123",
    auth0Id: "auth0|123456789",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
  ADMIN_USER: {
    id: "admin_123",
    auth0Id: "auth0|admin123",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  CUSTOMER_USER: {
    id: "customer_123",
    auth0Id: "auth0|customer123",
    email: "customer@example.com",
    name: "Customer User",
    role: "customer",
  },
  PROVIDER_USER: {
    id: "provider_123",
    auth0Id: "auth0|provider123",
    email: "provider@example.com",
    name: "Provider User",
    role: "provider",
  },
};

// Mock request objects with different user contexts
export const createMockRequest = (
  userType: keyof typeof MOCK_USERS = "REGULAR_USER",
) => {
  const user = MOCK_USERS[userType];
  return {
    user,
    headers: {
      authorization: MOCK_TOKENS.USER,
    },
    body: {},
    params: {},
    query: {},
  };
};

// Mock authentication middleware
export const mockAuthMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }

  if (authHeader === MOCK_TOKENS.INVALID) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (authHeader === MOCK_TOKENS.EXPIRED) {
    return res.status(401).json({ message: "Token expired" });
  }

  // Set user based on token
  if (authHeader === MOCK_TOKENS.ADMIN) {
    req.user = MOCK_USERS.ADMIN_USER;
  } else if (authHeader === MOCK_TOKENS.USER) {
    req.user = MOCK_USERS.REGULAR_USER;
  } else {
    req.user = MOCK_USERS.REGULAR_USER;
  }

  next();
};

// Mock admin guard
export const mockAdminGuard = (req: any, res: any, next: any) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// Mock user policy guard
export const mockUserPolicyGuard = (req: any, res: any, next: any) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Helper to set authorization header in tests
export const setAuthHeader = (token: string = MOCK_TOKENS.USER) => {
  return { Authorization: token };
};

// Helper to create authenticated request
export const createAuthenticatedRequest = (
  userType: keyof typeof MOCK_USERS = "REGULAR_USER",
) => {
  const user = MOCK_USERS[userType];
  const token =
    userType === "ADMIN_USER" ? MOCK_TOKENS.ADMIN : MOCK_TOKENS.USER;

  return {
    user,
    headers: {
      authorization: token,
    },
  };
};
