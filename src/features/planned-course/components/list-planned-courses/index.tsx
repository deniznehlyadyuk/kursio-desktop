import { ActionIcon, Flex, Menu, rem, Stack } from '@mantine/core';
import {
  IconCalendarPlus,
  IconDots,
  IconEdit,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { WeekCalendar } from '../../../../components';
import classes from './index.module.css';
import { CalendarPlannedCoursesProps } from './types';
import useListPlannedCourses from './use-list-planned-courses';

export default (props: CalendarPlannedCoursesProps) => {
  const [plannedCourses] = useListPlannedCourses();

  return (
    <Stack style={{ height: 'calc(100vh - 32px)', overflow: 'hidden' }}>
      <WeekCalendar
        items={plannedCourses}
        onEmptyCellClick={props.onNewButtonClick}
        itemRenderer={(plannedCourse) => (
          <Flex
            className={classes.wrapper}
            justify='space-between'
          >
            <div>
              {plannedCourse.name} ({plannedCourse.capacityUtilization}/
              {plannedCourse.quota})
            </div>
            <Menu position='bottom-start'>
              <Menu.Target>
                <ActionIcon
                  variant='transparent'
                  color={'#fff'}
                  aria-label='Settings'
                >
                  <IconDots />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Oturum</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconCalendarPlus
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                  onClick={() => props.onNewSessionButtonClick(plannedCourse)}
                >
                  Oturum Oluştur
                </Menu.Item>
                <Menu.Label>Öğrenci</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => props.onStudentsButtonClick(plannedCourse.id)}
                >
                  Öğrenciler
                </Menu.Item>
                <Menu.Label>Aksiyonlar</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconEdit style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => props.onUpdateButtonClick(plannedCourse)}
                >
                  Düzenle
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => props.onDeleteButtonClick(plannedCourse.id)}
                >
                  Sil
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        )}
      />
    </Stack>
  );
};
