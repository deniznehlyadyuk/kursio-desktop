import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { RowActionsProps } from './types';

export default (props: RowActionsProps) => {
  return (
    <Group gap='xs'>
      <Tooltip label='Derse Geldi'>
        <ActionIcon
          onClick={props.onAttended}
          color='green'
        >
          <IconCheck />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Derse Gelmedi'>
        <ActionIcon
          onClick={props.onMissed}
          color='red'
        >
          <IconX />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
