import { Button, Flex, View } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { NavLink, useParams } from 'react-router-dom';
import {
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
  HiUserGroup,
  HiEnvelope,
} from 'react-icons/hi2';
import { HiHome } from 'react-icons/hi';
import { IoHammer } from 'react-icons/io5';
import { concatClassNames } from 'utils/formatters';
import { ROUTES } from 'utils/constants';
import styles from './SidebarActions.module.css';

const buildRoutes = (habitat) => [
  {
    title: 'Home',
    Icon: HiHome,
    href: `/${habitat}/${ROUTES.HABITAT_AFFILIATE}/${ROUTES.HABITAT_AFFILIATE_HOME}`,
  },
  {
    title: 'Applications',
    Icon: HiEnvelope,
    href: `/${habitat}/${ROUTES.HABITAT_AFFILIATE}/${ROUTES.HABITAT_AFFILIATE_CYCLES}`,
  },
  {
    title: 'Repairs',
    Icon: IoHammer,
    href: `/${habitat}/${ROUTES.HABITAT_AFFILIATE}/${ROUTES.HABITAT_AFFILIATE_REPAIRS}`,
  },
  {
    title: 'Volunteers',
    Icon: HiUserGroup,
    href: `/${habitat}/${ROUTES.HABITAT_AFFILIATE}/${ROUTES.HABITAT_AFFILIATE_VOLUNTEERS}`,
  },
  {
    title: 'Settings',
    Icon: HiCog6Tooth,
    href: `/${habitat}/${ROUTES.HABITAT_AFFILIATE}/${ROUTES.HABITAT_AFFILIATE_SETTINGS}`,
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
