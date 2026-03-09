export type ApiResponse<T> = {
  data?: T;
  message: string;
  status: 200 | 201 | 400 | 401 | 403 | 404 | 500;
  success: boolean;
};
