export interface ApiResponse<T = any> {
  success: boolean;
  result: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface QueryParams {
  from?: number;
  to?: number;
  expandKeys?: Record<string, string[]>;
}
