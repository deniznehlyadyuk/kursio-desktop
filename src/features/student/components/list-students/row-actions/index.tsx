import { ActionIcon, Menu, rem } from '@mantine/core';
import {IconCalendarUser, IconCoin, IconDots, IconEdit} from '@tabler/icons-react';
import { RowActionsProps } from './types';

export default (props: RowActionsProps) => {
  return (
    <Menu position='bottom-end'>
      <Menu.Target>
        <ActionIcon title='Ayarlar'>
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Seçenekler</Menu.Label>
          <Menu.Item
              leftSection={<IconCalendarUser style={{ width: rem(20), height: rem(20) }} />}
              onClick={props.onShowAttendancesButtonClick}
              disabled={props.student.hasAttended === 0}
          >
              Ders Katılım Çizelgesi
          </Menu.Item>
        <Menu.Item
          leftSection={<IconEdit style={{ width: rem(20), height: rem(20) }} />}
          onClick={props.onUpdateButtonClick}
        >
          Güncelle
        </Menu.Item>
        <Menu.Item
          leftSection={<IconCoin style={{ width: rem(20), height: rem(20) }} />}
          onClick={props.onLogPaymentButtonClick}
        >
          Para Girişi
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
