import { Flex, Badge } from '@aws-amplify/ui-react';
import PageTitle from '../components/PageTitle/PageTitle';

export function AffiliatePortalSettingsPage() {
  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <PageTitle title="Settings" />
      <Badge variation="warning" width="100%">
        This page is currently under construction
      </Badge>
    </Flex>
  );
}
