import { Flex, Image, Menu, MenuItem } from '@aws-amplify/ui-react';

import nimbusLogo from '../../assets/images/nimbus-logo.png';

export function LandingNav() {
  const nav = (
    <Flex
      direction="row"
      width="100%"
      backgroundColor="white"
      alignItems="center"
    >
      <Flex width="25%" height="100%">
        <Image alt="Habitat Logo" src={nimbusLogo} height="100%" width="100%" />
      </Flex>
      <Flex
        width="75%"
        justifyContent="flex-end"
        height="100%"
        marginRight="30px"
      >
        <Menu>
          <MenuItem>Contact</MenuItem>
        </Menu>
      </Flex>
    </Flex>
  );
  return nav;
}
