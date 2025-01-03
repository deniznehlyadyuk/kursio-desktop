import { ActionIcon, Tooltip } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { RowActionsProps } from './types';

export default (props: RowActionsProps) => {
  return (
    <Tooltip label='Devamsızlık Girişi'>
      <ActionIcon onClick={props.onAttendancesButtonClick}>
        <IconUsers />
      </ActionIcon>
    </Tooltip>
  );
};
