/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { Flex, Button } from '@aws-amplify/ui-react';
import { LandingFooter } from './LandingFooter';

export function LandingLayout({ comp }) {
  function handleScrollToContactForm() {
    const contactFormSection = document.getElementById('contactFormSection');
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Flex width="100%" direction="column" gap="0" height="fit-content">
      <Flex direction="column" width="100%" height="fit-content">
        {comp}
      </Flex>
      <Flex>
        <LandingFooter align-self="flex-end" />
      </Flex>
    </Flex>
  );
}
