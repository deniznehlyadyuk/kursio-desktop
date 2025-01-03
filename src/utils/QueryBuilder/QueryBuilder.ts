import { FilterOrHavingGroup, IColumnValue } from './types';

class QueryBuilder {
  tableName: string;
  select: Record<string, IColumnValue>;
  filters: FilterOrHavingGroup[];
  havings: FilterOrHavingGroup[];
  orderByClauses: string[];
  limitClause: string;
  joins: string[];
  groupQuery: string;

  constructor(tableName: string, select: Record<string, IColumnValue>) {
    this.tableName = tableName;
    this.select = select;
    this.filters = [];
    this.orderByClauses = [];
    this.limitClause = '';
    this.joins = [];
    this.havings = [];
    this.groupQuery = '';
  }

  addFilterGroup(filterGroup: FilterOrHavingGroup) {
    this.filters.push(filterGroup);
  }

  addHavingGroup(havingGroup: FilterOrHavingGroup) {
    this.havings.push(havingGroup);
  }

  addOrderByClause(clause: string) {
    this.orderByClauses.push(clause);
  }

  setLimitClause(limit: string) {
    this.limitClause = limit;
  }

  addJoin(join: string) {
    this.joins.push(join);
  }

  setGroupQuery(groupQuery: string) {
    this.groupQuery = groupQuery;
  }

  buildForSelect() {
    let query =
      'SELECT ' +
      Object.keys(this.select)
        .map(
          (targetColumnName) =>
            `(${this.select[targetColumnName].value}) AS ${targetColumnName}`
        )
        .join(', ') +
      ` FROM ${this.tableName}`;

    if (this.joins.length > 0) {
      const joinClause = this.joins
        .map((join) => `LEFT JOIN ${join}`)
        .join(' ');
      query += ' ' + joinClause;
    }

    if (this.filters.some((filter) => filter.clauses.length > 0)) {
      const whereClause = this.filters
        .map((filterGroup) =>
          filterGroup.clauses.length > 0
            ? `(${filterGroup.clauses.join(` ${filterGroup.operator} `)})`
            : null
        )
        .filter((filterGroup) => filterGroup !== null)
        .join(' AND ');
      query += ' WHERE ' + whereClause;
    }

    if (this.groupQuery.length > 0) {
      query += ` GROUP BY ${this.groupQuery}`;
    }

    if (this.havings.some((having) => having.clauses.length > 0)) {
      const havingClause = this.havings
        .map((havingGroup) =>
          havingGroup.clauses.length > 0
            ? `(${havingGroup.clauses.join(` ${havingGroup.operator} `)})`
            : null
        )
        .filter((havingGroup) => havingGroup !== null)
        .join(' AND ');
      query += ' HAVING ' + havingClause;
    }

    if (this.orderByClauses.length > 0) {
      query += ' ORDER BY ' + this.orderByClauses.join(', ');
    }

    if (this.limitClause) {
      query += ' ' + this.limitClause;
    }

    return query;
  }

  buildForCount() {
    let query = `SELECT COUNT(*) FROM ${this.tableName}`;

    if (this.joins.length > 0) {
      const joinClause = this.joins
        .map((join) => `LEFT JOIN ${join}`)
        .join(' ');
      query += ' ' + joinClause;
    }

    if (this.filters.some((filter) => filter.clauses.length > 0)) {
      const whereClause = this.filters
        .map((filterGroup) =>
          filterGroup.clauses.length > 0
            ? `(${filterGroup.clauses.join(` ${filterGroup.operator} `)})`
            : null
        )
        .filter((filterGroup) => filterGroup !== null)
        .join(' AND ');
      query += ' WHERE ' + whereClause;
    }

    if (this.havings.some((having) => having.clauses.length > 0)) {
      const havingClause = this.havings
        .map((havingGroup) =>
          havingGroup.clauses.length > 0
            ? `(${havingGroup.clauses.join(` ${havingGroup.operator} `)})`
            : null
        )
        .filter((havingGroup) => havingGroup !== null)
        .join(' AND ');
      query += ' HAVING ' + havingClause;
    }

    return query;
  }
}

export default QueryBuilder;
