import { MRT_RowSelectionState } from 'mantine-react-table';

export default (state: MRT_RowSelectionState) =>
  Object.keys(state).filter((item) => state[item]);
