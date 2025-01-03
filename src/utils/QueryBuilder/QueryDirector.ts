import QueryBuilder from './QueryBuilder';
import { IStrategy } from './types';

class QueryDirector {
  builder: QueryBuilder;
  strategies: IStrategy[];

  constructor(builder: QueryBuilder) {
    this.builder = builder;
    this.strategies = [];
  }

  addStrategy(strategy: IStrategy) {
    this.strategies.push(strategy);
  }

  construct() {
    this.strategies.forEach((strategy) => strategy.apply(this.builder));
  }

  getQueries() {
    return [this.builder.buildForSelect(), this.builder.buildForCount()];
  }
}

export default QueryDirector;
