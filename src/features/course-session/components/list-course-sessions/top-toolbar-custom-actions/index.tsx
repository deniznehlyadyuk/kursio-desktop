import { Button, Flex } from '@mantine/core';
import { TopToolbarCustomActionsProps } from './types';

export default ({
  deleteButtonDisabled,
  onDeleteButtonClick,
}: TopToolbarCustomActionsProps) => {
  return (
    <Flex
      gap='xs'
      align='center'
    >
      <Button
        color='red'
        disabled={deleteButtonDisabled}
        onClick={onDeleteButtonClick}
      >
        Seçilenleri Sil
      </Button>
    </Flex>
  );
};
