export interface IPatchRequest {
  path: string;
  op: string;
  value: string;
}

export interface IErrorResponse {
  errors: Record<string, string[]>;
  status: number;
  title: string;
  traceId: string;
  type: string;
}

export interface IGridError {
  name: string | null;
  message: string[];
}

export interface IDataSourceChanged {
  created: boolean;
  errors: IGridError[];
}
