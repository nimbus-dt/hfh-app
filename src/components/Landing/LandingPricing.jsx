import {
  Flex,
  Card,
  Image,
  Heading,
  Text,
  ScrollView,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import logo from '../../assets/images/nimbus-logo.png';

export function LandingPricing() {
  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      backgroundColor="#34548c"
      alignItems="center"
      alignContent="center"
    >
      <Card width="80%" variation="elevated" height="80%" marginTop="100px">
        <Flex
          direction={responsiveBool ? 'column' : 'row'}
          width="100%"
          height="100%"
          justifyContent={responsiveBool ? 'center' : 'space-between'}
        >
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={logo} alt="Nimbus Logo" />
          </Flex>
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Heading level="5" textAlign="center">
              Pricing
            </Heading>
            <ScrollView height="50%" width="100%">
              <Text textAlign="start">
                Welcome to Habitat App Pricing for Habitat for Humanity
                Affiliates! We're excited to partner with Habitat for Humanity
                and provide you with an online platform to streamline your
                homeownership program application process. Our pricing structure
                is designed to support your organization's mission while
                ensuring a seamless experience for you and your administrative
                users. Here are the details: <br /> <br />
                1. Initial Sign-Up Fee: To get started with Habitat App, we
                charge a one-time initial sign-up fee. This fee covers the setup
                and customization of the platform according to your specific
                requirements. Our team will work closely with you to ensure a
                smooth integration of the app into your workflow, providing
                personalized assistance during the implementation phase. <br />
                <br />
                2. Fee per Application Cycle: We understand that the application
                cycle is a crucial period for Habitat for Humanity affiliates.
                During this time, administrative users receive and review
                pre-screen forms from potential homeowners. To support you
                during each application cycle, we charge a fee based on the
                total number of applications received and the number of
                administrative users utilizing the platform for review. The fee
                per application cycle is designed to align with your
                organization's needs. As the number of applications and
                administrative users may vary, we provide a scalable pricing
                structure to accommodate fluctuations in demand. Our goal is to
                ensure fair and transparent pricing that grows alongside your
                program. For a detailed estimate of the fee per application
                cycle based on your specific requirements, please contact our
                sales team. We'll be more than happy to discuss your
                organization's unique needs and provide a customized quote.
                <br /> <br /> At Habitat App, we are committed to supporting
                Habitat for Humanity in its mission to provide affordable
                housing. Our pricing structure reflects this commitment,
                offering flexibility and scalability to meet the changing
                demands of your homeownership program. Together, let's empower
                more families to achieve their dream of homeownership with the
                help of Habitat App. Contact us today to learn more about our
                pricing options and start streamlining your application process!
              </Text>
            </ScrollView>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
