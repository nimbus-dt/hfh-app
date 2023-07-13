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

export function LandingReturn() {
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
              Return Policy
            </Heading>
            <ScrollView height="50%" width="100%">
              <Text textAlign="center">
                Return Policy This Return Policy ("Policy") outlines the terms
                and conditions related to the use, termination, and extraction
                of data from the Habitat App provided by Nimbus S.A de C.V.
                ("Provider," "we," or "us") by Habitat affiliates ("Clients,"
                "you," or "your"). Please read this Policy carefully before
                using the Habitat App. 1. SaaS Service The Habitat App is a
                Software-as-a-Service (SaaS) platform, and as such, there are no
                physical products to be returned or refunded. This Policy
                primarily covers the termination of service and the extraction
                of data. 2. Termination and Refunds If a Client wishes to cease
                usage of the Habitat App, any fees paid for the current month
                will not be refunded. Termination will be effective at the end
                of the current billing cycle. 3. Data Extraction If a Client
                wishes to extract their data from the Habitat App upon
                termination, an additional fee may apply. This fee covers the
                costs associated with extracting and providing the data in a
                usable format. The specific fee will be communicated to the
                Client upon their request for data extraction. 4. Communication
                and Requests Any requests for termination or data extraction
                should be submitted in writing or through the designated
                communication channel provided by the Provider. We will make
                reasonable efforts to respond to your requests in a timely
                manner. 5. Modifications to the Policy We reserve the right to
                modify this Return Policy at any time, without prior notice. Any
                changes will be effective immediately upon posting the updated
                Policy on our website. It is your responsibility to review this
                Policy periodically. 6. Contact Us If you have any questions or
                concerns regarding this Return Policy or the termination and
                data extraction process, please contact us using the contact
                details provided below.
              </Text>
            </ScrollView>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
