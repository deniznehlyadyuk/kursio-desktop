import { Button, Flex } from '@mantine/core';
import { TopToolbarCustomActionsProps } from './types';

export default ({
  onNewButtonClick,
  deleteButtonDisabled,
  onDeleteButtonClick,
}: TopToolbarCustomActionsProps) => {
  return (
    <Flex
      gap='xs'
      align='center'
    >
      <Button onClick={onNewButtonClick}>Öğrenci Oluştur</Button>
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
