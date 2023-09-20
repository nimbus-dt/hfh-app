import { Button, Flex, View } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { NavLink, useParams } from 'react-router-dom';
import {
  HiCog6Tooth,
  HiArrowPath,
  HiArrowLeftOnRectangle,
} from 'react-icons/hi2';
import { HiHome } from 'react-icons/hi';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { concatClassNames } from '../../../utils/formatters';
import styles from './SidebarActions.module.css';

const buildRoutes = (habitat) => [
  {
    title: 'Home',
    Icon: HiHome,
    href: `/affiliate/${habitat}/home`,
  },
  {
    title: 'Application Cycles',
    Icon: HiArrowPath,
    href: `/affiliate/${habitat}/cycle`,
  },
  {
    title: 'Settings',
    Icon: HiCog6Tooth,
    href: `/affiliate/${habitat}/settings`,
  },
  {
    title: 'Billing',
    Icon: BiMoneyWithdraw,
    href: `/affiliate/${habitat}/billing`,
  },
];

export function SidebarActions() {
  const { habitat } = useParams();
  const routes = buildRoutes(habitat);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // Sign-out successful, perform any additional actions or navigate to the desired page
    } catch (error) {
      console.log('Error signing out:', error);
      // Handle sign-out error
    }
  };

  return (
    <Flex
      direction="column"
      className={styles.navContainer}
      gap="0.5rem"
      paddingTop="1rem"
      grow={1}
      justifyContent="space-between"
    >
      <Flex
        as="nav"
        direction="column"
        width="100%"
        gap="0.5rem"
        marginTop="1rem"
        paddingLeft="0.5rem"
        paddingRight="0.5rem"
        justifyContent="start"
        alignItems="start"
      >
        {routes.map((route) => (
          <NavLink
            to={route.href}
            key={route.href}
            className={({ isActive }) =>
              concatClassNames(styles.navLink, isActive ? styles.active : null)
            }
          >
            {({ isActive }) => (
              <View
                as="span"
                className={
                  isActive ? styles.navLinkButtonActive : styles.navLinkButton
                }
                variation="link"
                width="100%"
              >
                <Flex width="100%">
                  <route.Icon size={24} />
                  {route.title}
                </Flex>
              </View>
            )}
          </NavLink>
        ))}
      </Flex>

      <Button
        className={styles.signOutBtn}
        variation="link"
        onClick={handleSignOut}
      >
        <Flex width="100%">
          <HiArrowLeftOnRectangle size={24} />
          Sign Out
        </Flex>
      </Button>
    </Flex>
  );
}
