export interface Table {
  [key: string]: string;
}

export type TableRow = Table[];

export interface TableData {
  [key: string]: TableRow;
}

export interface TableKeys {
  [key: string]: string[];
}

export interface ExternalTable {
  data: TableData;
  keys: TableKeys;
  id: string;
}

export enum ApplicationStatus {
  Idle,
  Loading,
  Error,
}

export interface FileWithSize {
  file: string;
  size: number;
  createdAt: Date;
}
