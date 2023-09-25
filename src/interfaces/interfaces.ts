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
}

export enum ApplicationStatus {
  Idle,
  Loading,
  Error,
}
