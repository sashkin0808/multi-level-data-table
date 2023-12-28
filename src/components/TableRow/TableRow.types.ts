export type Row = {
  equipmentCosts: number,
  estimatedProfit: number,
  id: number,
  machineOperatorSalary: number,
  mainCosts: number,
  materials: number,
  mimExploitation: number,
  overheads: number,
  rowName: string,
  salary: number,
  supportCosts: number,
  total: number
};

export type RowTree = Row & {
  child: RowTree[],
  new?: boolean
};

export type RowChangeResponse = {
  changed: Row[],
  current: Row
};

export type RowChangeTransfromResponse = {
  parentId?: number,
  cliendId?: number,
  deletedId?: number,
  response: RowChangeResponse
};

export type RowCreateRequest = {
  parentId?: number,
  equipmentCosts: number,
  estimatedProfit: number,
  machineOperatorSalary: number,
  mainCosts: number,
  materials: number,
  mimExploitation: number,
  overheads: number,
  rowName: string,
  salary: number,
  supportCosts: number
};
export type RowUpdateRequest = {
  id: number,
  body: RowCreateRequest
};