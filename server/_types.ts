export interface Resource {
  _id: string;
  created: Date;
  name: string;
  value: number;
}

export interface SimpleUser {
  name: string;
  email: string;
}

export interface PagingParams {
  offset: number;
  limit: number;
}
