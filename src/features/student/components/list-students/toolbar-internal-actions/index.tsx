import { Flex } from '@mantine/core';
import { MRT_ToggleGlobalFilterButton } from 'mantine-react-table';
import { ToolbarInternalActionsProps } from './types';

export default (props: ToolbarInternalActionsProps) => {
  return (
    <Flex
      gap='xs'
      align='center'
    >
      <MRT_ToggleGlobalFilterButton table={props.table} />
    </Flex>
  );
};
