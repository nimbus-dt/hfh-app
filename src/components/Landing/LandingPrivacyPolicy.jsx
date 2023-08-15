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

export function LandingPrivacyPolicy() {
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
      <Card
        width={responsiveBool ? '90%' : '85%'}
        height={responsiveBool ? 'fit-content' : '80%'}
        variation="elevated"
        marginTop="5%"
        marginBottom="5%"
      >
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
              Privacy Policy
            </Heading>
            <ScrollView height="50%" width="100%">
              <Text textAlign="center">
                Privacy Policy This Privacy Policy ("Policy") outlines how
                Nimbus S.A de C.V. ("Provider," "we," or "us") collects, uses,
                and protects personal information obtained through the use of
                the Habitat App by Habitat affiliates ("Clients," "you," or
                "your"). This Policy applies to the collection, use, and
                disclosure of personal information by Provider in connection
                with the Habitat App. 1. Information We Collect We may collect
                the following types of personal information from Clients: -
                Basic contact information, such as name, address, email, and
                phone number. - Other information voluntarily provided by
                Clients for the purpose of using the Habitat App. 2. Use of
                Personal Information We may use the personal information
                collected from Clients for the following purposes: - To provide
                and maintain the functionality of the Habitat App. - To
                communicate with Clients regarding updates, changes, or
                technical issues related to the App. - To process payments and
                invoices. - To improve and enhance the Habitat App and develop
                new features. 3. Data Sharing and Disclosure We do not sell,
                trade, or rent personal information to third parties. However,
                we may disclose personal information in the following
                circumstances: - With the explicit consent of the Client. - To
                comply with legal obligations, such as responding to lawful
                requests or legal processes. - To protect the rights, property,
                or safety of Provider, Clients, or others. 4. Data Retention We
                retain personal information for as long as necessary to fulfill
                the purposes outlined in this Policy or as required by
                applicable laws. When personal information is no longer needed,
                we will securely dispose of or anonymize it. 5. Data Security We
                implement reasonable security measures to protect personal
                information from unauthorized access, use, or disclosure.
                However, no method of data transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee
                absolute security. 6. Third-Party Services The Habitat App may
                include links to third-party websites or services that are not
                operated by us. These third-party services have their own
                privacy policies, and we encourage Clients to review them. We do
                not assume any responsibility for the privacy practices of
                third-party services. 7. Updates to the Privacy Policy We may
                update this Privacy Policy from time to time. Any changes will
                be posted on our website or communicated to Clients through the
                Habitat App. Clients are advised to review this Policy
                periodically for any updates. 8. Contact Us If you have any
                questions, concerns, or requests regarding this Privacy Policy
                or the handling of personal information, please contact us at
                support@nimbus-dt.com .
              </Text>
            </ScrollView>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
