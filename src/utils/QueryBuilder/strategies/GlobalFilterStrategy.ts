import QueryBuilder from '../QueryBuilder';
import { IColumnValue, IStrategy } from '../types';

class GlobalFilterStrategy implements IStrategy {
  columns: string[];
  search: string;

  constructor(select: Record<string, IColumnValue>, search: string) {
    this.columns = Object.values(select)
      .filter((column) => column.includeGlobalFilter)
      .map((column) => column.value);
    this.search = search;
  }

  apply(builder: QueryBuilder) {
    if (this.search) {
      builder.addFilterGroup({
        clauses: this.columns.map(
          (column) => `${column} LIKE '%${this.search}%'`
        ),
        operator: 'OR',
      });
    }
  }
}

export default GlobalFilterStrategy;
