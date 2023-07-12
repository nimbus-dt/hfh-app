import {
  Button,
  Flex,
  Card,
  Heading,
  Image,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import heroIcon from '../../assets/images/hero-icon.svg';

export function LandingHero() {
  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  const contactButton = (
    <Button backgroundColor="white" onClick={() => handleScrollToContactForm()}>
      Contact us
    </Button>
  );

  function handleScrollToContactForm() {
    const contactFormSection = document.getElementById('contactFormSection');
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const hero = (
    <Card width="100%" height="500px" backgroundColor="#34548c" padding="0">
      <Flex
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
      >
        <Flex
          direction="column"
          alignItems="center"
          width={!responsiveBool ? '50%' : '100%'}
        >
          <Heading level="1" fontWeight="bold" color="white" textAlign="center">
            Digitally transform
          </Heading>
          <Heading
            level="1"
            fontWeight="bold"
            marginBottom="10px"
            color="white"
            textAlign="center"
          >
            your Habitat affiliate
          </Heading>
          <Heading
            level="4"
            fontWeight="normal"
            marginBottom="30px"
            width="40%"
            textAlign="center"
            color="white"
          >
            With our platform you can take all your processes digital, storing
            all of your affiliate's data securely in the cloud
          </Heading>
          {contactButton}
        </Flex>
        {!responsiveBool && (
          <Flex direction="column" alignItems="center" width="50%">
            <Image alt="Hero Icon" src={heroIcon} height="100%" width="100%" />
          </Flex>
        )}
      </Flex>
    </Card>
  );

  return hero;
}
