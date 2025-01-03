import QueryBuilder from '../QueryBuilder';
import { IStrategy } from '../types';

class GroupByStrategy implements IStrategy {
  groups: string[];

  constructor(groups: string[]) {
    this.groups = groups;
  }

  apply(builder: QueryBuilder) {
    const groupsQuery = this.groups.join(', ');
    builder.setGroupQuery(groupsQuery);
  }
}

export default GroupByStrategy;
