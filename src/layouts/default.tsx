import { ActionIcon, AppShell, Flex, Stack, Text } from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBook2,
  IconCalendarCheck,
  IconCalendarMonth,
  IconCoin,
  IconUser,
} from '@tabler/icons-react';
import { CSSProperties, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/logo.png';
import classes from './default.module.css';

const collapsedNavlinkStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const navItems = [
  {
    to: 'students',
    icon: IconUser,
    text: 'Öğrenciler',
  },
  {
    to: 'courses',
    icon: IconBook2,
    text: 'Kurslar',
  },
  {
    to: 'planned-courses',
    icon: IconCalendarMonth,
    text: 'Planlanmış Kurslar',
  },
  {
    to: 'course-sessions',
    icon: IconCalendarCheck,
    text: 'Kurs Oturumları',
  },
  {
    to: 'payment-history',
    icon: IconCoin,
    text: 'Para Geçmişi',
  },
];

export default () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <AppShell
      navbar={{
        width: collapsed ? 69 : 300,
        breakpoint: 'sm',
      }}
      padding='md'
    >
      <AppShell.Navbar
        classNames={{ navbar: classes.navbar }}
        p={collapsed ? 'xs' : 'lg'}
      >
        <Stack className={classes.container}>
          {collapsed && (
            <ActionIcon
              className={classes.expandButton}
              variant='filled'
              size='xs'
              radius='50%'
              onClick={toggleCollapse}
            >
              <IconArrowRight />
            </ActionIcon>
          )}

          <Flex
            mb='lg'
            gap='sm'
            align='center'
            justify='center'
            direction={collapsed ? 'column-reverse' : 'row'}
          >
            <img
              src={Logo}
              width={32}
              height={32}
            />

            {!collapsed && (
              <>
                <Text
                  fw={700}
                  size='lg'
                >
                  Kurs.io
                </Text>

                <ActionIcon
                  variant='default'
                  size='sm'
                  ml='auto'
                  onClick={toggleCollapse}
                >
                  <IconArrowLeft />
                </ActionIcon>
              </>
            )}
          </Flex>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={collapsed ? collapsedNavlinkStyle : undefined}
              >
                <Icon
                  width={20}
                  height={20}
                />
                {!collapsed && <span>{item.text}</span>}
              </NavLink>
            );
          })}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main classNames={{ main: classes.main }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
