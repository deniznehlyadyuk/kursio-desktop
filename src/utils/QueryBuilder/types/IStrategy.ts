import QueryBuilder from '../QueryBuilder';

export default interface IStrategy {
  apply: (builder: QueryBuilder) => void;
}
