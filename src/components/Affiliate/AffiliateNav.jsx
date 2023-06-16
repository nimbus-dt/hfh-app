import { Image, Card, Flex, Menu, MenuItem } from '@aws-amplify/ui-react';
import logoHabitat from '../../assets/images/logoHabitat.svg';

// eslint-disable-next-line react/prop-types
export function AffiliateNav() {
  const menu = (
    <Menu className="my-menu-content" triggerClassName="my-menu-trigger">
      <MenuItem>Home</MenuItem>
    </Menu>
  );

  return (
    <Card wrap width="100%" backgroundColor="#55B949" padding="0">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Image alt="Habitat Logo" src={logoHabitat} height="100%" />
        <Flex marginRight="40px">{menu}</Flex>
      </Flex>
    </Card>
  );
}
