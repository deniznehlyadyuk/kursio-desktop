import { Button, Flex } from '@mantine/core';
import { TopToolbarCustomActionsProps } from './types';

export default ({
  onNewButtonClick,
  newButtonDisabled,
  deleteButtonDisabled,
  onDeleteButtonClick,
}: TopToolbarCustomActionsProps) => {
  return (
    <Flex
      gap='xs'
      align='center'
    >
      <Button onClick={onNewButtonClick} disabled={newButtonDisabled}>Öğrenci Ekle</Button>
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
