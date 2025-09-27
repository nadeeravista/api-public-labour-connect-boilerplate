/**
 * Common types
 */
export interface ApiResponse<T = unknown> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id?: string;
  auth0Id: string;
  email: string;
  name: string;
  customerId: string | null;
  providerId: string | null;
  role?: string[];
}
