export type TRequestStatusOption =
  | 'not_started'
  | 'pending'
  | 'fulfilled'
  | 'rejected'
  | 'cancelled';

export type TRequestState = {
  status: TRequestStatusOption;
  error?: IErrors | null;
};

export interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

export interface IErrorsDetail {
  [x: string]: {id: string; message: string}[];
}

export interface IResponse<T> {
  statuscode: number;
  message: string;
  data: T;
}

export interface IResponseMessage {
  statuscode: number;
  message: string;
}
