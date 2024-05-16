import {
  Flex,
  Image,
  Menu,
  MenuItem,
  Text,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import whiteLogo from 'assets/images/white-logo.jpg';
import './styles.css';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

function Nav() {
  const mobile = useBreakpointValue({
    base: true,
    small: false,
  });

  function scrollToSection(sectionId: string) {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Flex
      className="nav"
      direction="row"
      width="100%"
      height="fit-content"
      justifyContent="space-between"
      alignItems="center"
      padding={{
        base: '24px 24px',
        medium: '24px 48px',
        large: '24px 128px',
      }}
    >
      <Image
        alt="Habitat App Logo"
        src={whiteLogo}
        height="56px"
        width="176px"
      />
      {mobile ? (
        <Flex width="fit-content" height="fit-content" padding="10px">
          <Menu triggerClassName="my-menu-trigger">
            <MenuItem>Features</MenuItem>
            <MenuItem>Contact Us</MenuItem>
            <MenuItem>FAQs</MenuItem>
          </Menu>
        </Flex>
      ) : (
        <Flex
          direction="row"
          width="fit-content"
          height="fit-content"
          padding="10px"
          gap="8px"
          alignItems="center"
        >
          <Text
            padding="12px 16px"
            width="fit-content"
            height="fit-content"
            fontWeight="bold"
            textAlign="center"
            className="navLink"
            onClick={() => scrollToSection('#features')}
          >
            Features
          </Text>
          <Text
            padding="12px 16px"
            width="fit-content"
            height="fit-content"
            fontWeight="bold"
            textAlign="center"
            className="navLink"
            onClick={() => scrollToSection('#contact')}
          >
            Contact Us
          </Text>
          <Text
            padding="12px 16px"
            width="fit-content"
            height="fit-content"
            fontWeight="bold"
            textAlign="center"
            className="navLink"
            onClick={() => scrollToSection('#faqs')}
          >
            FAQs
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Nav;
