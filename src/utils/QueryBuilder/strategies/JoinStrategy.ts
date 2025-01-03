import QueryBuilder from '../QueryBuilder';
import { IStrategy, Join } from '../types';

class JoinStrategy implements IStrategy {
  joins: Join[];

  constructor(joins: Join[]) {
    this.joins = joins;
  }

  apply(builder: QueryBuilder) {
    this.joins
      .map(
        (join) =>
          `${join.table} ON ${join.on
            .map((on) => `${on[0]} = ${on[1]}`)
            .join(' AND ')}`
      )
      .forEach((join) => {
        builder.addJoin(join);
      });
  }
}

export default JoinStrategy;
