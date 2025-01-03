import { ActionIcon, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { RowActionsProps } from './types';

export default (props: RowActionsProps) => {
  return (
    <Tooltip label='Güncelle'>
      <ActionIcon onClick={props.onUpdateButtonClick}>
        <IconEdit />
      </ActionIcon>
    </Tooltip>
  );
};
