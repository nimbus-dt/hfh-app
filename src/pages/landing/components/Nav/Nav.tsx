import { Flex, Image, Text } from '@aws-amplify/ui-react';
import whiteLogo from 'assets/images/white-logo.jpg';
import style from './Nav.module.css';

function NavLink({ caption }: { caption: string }) {
  return (
    <Flex className={`${style.navLinkFlex}`}>
      <Text className={`${style.navLinkText}`}>{caption}</Text>
    </Flex>
  );
}

function Nav() {
  return (
    <Flex className={`${style.nav}`}>
      <Image alt="Hey" src={whiteLogo} height="56px" width="176px" />
      <Flex className={`${style.navLinks}`}>
        <NavLink caption="Benefits" />
        <NavLink caption="FAQs" />
        <NavLink caption="Contact Us" />
        <NavLink caption="Sign In" />
      </Flex>
    </Flex>
  );
}

export default Nav;
