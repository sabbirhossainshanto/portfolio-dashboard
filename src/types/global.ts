export type TError = {
  data: {
    error: Record<string, unknown>;
    errorSource: {
      message: string;
      path: string;
    }[];
    message: string;
    stack: string;
    success: boolean;
  };
  statusCode: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export interface IResponse<T> {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
}
