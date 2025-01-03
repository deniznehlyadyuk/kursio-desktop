export interface IColumnValue {
  readonly value: string;
  readonly includeGlobalFilter: boolean;
}

export class StaticColumnValue implements IColumnValue {
  public readonly value: string;
  public readonly includeGlobalFilter: boolean;

  constructor(value: string, includeGlobalFilter = true) {
    this.value = value;
    this.includeGlobalFilter = includeGlobalFilter;
  }
}

export class CalculatedColumnValue implements IColumnValue {
  public readonly value: string;
  public readonly includeGlobalFilter: boolean;

  constructor(value: string, includeGlobalFilter = true) {
    this.value = value;
    this.includeGlobalFilter = includeGlobalFilter;
  }
}
