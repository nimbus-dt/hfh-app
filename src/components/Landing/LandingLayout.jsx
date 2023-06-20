/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { Flex, Button, Card, Heading, Text } from '@aws-amplify/ui-react';

export function LandingLayout() {
  const contactButton = <Button backgroundColor="white">Contact us</Button>;

  const nav = (
    <Flex direction="row" width="100%" marginBottom="50px">
      <Flex width="25%">Logo here</Flex>
      <Flex width="75%" justifyContent="flex-end">
        {contactButton}
      </Flex>
    </Flex>
  );

  const hero = (
    <Card
      variation="outlined"
      width="100%"
      height="500px"
      backgroundImage="linear-gradient(to bottom right, #55B949, #ffffff)"
    >
      <Flex direction="column" alignItems="center">
        {nav}
        <Heading level="1" fontWeight="bold">
          Digitally transform
        </Heading>
        <Heading level="1" fontWeight="bold">
          your Habitat affiliate
        </Heading>
        <Heading level="4" fontWeight="normal" marginBottom="30px">
          Our platform serves all of your affiliate's needs, in the cloud
        </Heading>
        {contactButton}
      </Flex>
    </Card>
  );

  const explanation = (
    <Card variation="outlined" width="100%" backgroundColor="#242524">
      <Flex direction="row" alignItems="center" width="100%">
        <Flex width="50%" alignItems="center" direction="column">
          <Heading color="white" level="3">
            Our platform's features
          </Heading>
          <Flex direction="row" alignItems="center">
            <Text color="white">
              Forget paper applications. Applicants apply through your own
              website.
            </Text>
          </Flex>
          <Flex direction="row">
            <Text color="white">
              Store all of your data in the cloud, available for easy access.
            </Text>
          </Flex>
        </Flex>
        <Flex width="50%" alignItems="center" alignContent="center">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/4fezP875xOQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </Flex>
      </Flex>
    </Card>
  );

  const contactForm = (
    <Card variation="outlined" width="100%" height="500px">
      <Flex direction="column">Contact</Flex>
    </Card>
  );

  const footer = (
    <Card variation="outlined" width="100%" height="200px">
      <Flex direction="column">Footer</Flex>
    </Card>
  );

  return (
    <Flex width="100%" direction="column">
      {hero}
      {explanation}
      {contactForm}
      {footer}
    </Flex>
  );
}
