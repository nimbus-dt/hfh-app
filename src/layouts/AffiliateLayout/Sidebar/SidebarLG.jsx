import { Flex, Image } from '@aws-amplify/ui-react';
import { COLORS } from '../../../utils/constants';
import logoHabitat from '../../../assets/images/logoHabitat.svg';
import { SidebarActions } from './SidebarActions';

export function SidebarLG() {
  return (
    <Flex
      direction="column"
      width="18rem"
      backgroundColor={COLORS.SECONDARY.DEFAULT}
      gap="0rem"
      margin="0rem"
      overflow="auto"
    >
      <Image
        alt="Habitat Logo"
        src={logoHabitat}
        height="6rem"
        margin={0}
        objectFit="cover"
        paddingLeft="0.5rem"
        paddingRight="0.5rem"
      />

      <SidebarActions />
    </Flex>
  );
}
