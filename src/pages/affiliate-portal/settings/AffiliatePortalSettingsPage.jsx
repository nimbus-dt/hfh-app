import { Flex, Badge } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import PageTitle from '../components/PageTitle/PageTitle';

export function AffiliatePortalSettingsPage() {
  const { habitat } = useOutletContext();
  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <PageTitle title="Settings" habitatName={habitat?.name} />
      <Badge variation="warning" width="100%">
        This page is currently under construction
      </Badge>
    </Flex>
  );
}
