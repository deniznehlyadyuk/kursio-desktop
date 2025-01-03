type OnType = [string, string];

export default interface Join {
  table: string;
  on: OnType[];
}
