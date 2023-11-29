/* eslint-disable react/prop-types */
import { Image, Card, Flex } from '@aws-amplify/ui-react';
import logoHabitat from '../../../assets/images/logoHabitat.svg';

export function TestNav() {
  return (
    <Card wrap width="100%" backgroundColor="#55B949" padding="0">
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Image
          alt="Habitat Logo"
          src={logoHabitat}
          height="100%"
          marginLeft="-10px"
        />
      </Flex>
    </Card>
  );
}
