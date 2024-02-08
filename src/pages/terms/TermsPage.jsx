import { Heading, Flex, Text } from '@aws-amplify/ui-react';
import { CustomCard } from 'components/Test/Reusable/CustomCard';

const TermsPage = () => (
  <Flex
    direction="column"
    paddingBottom="1rem"
    paddingTop="1rem"
    alignItems="center"
  >
    <CustomCard>
      <Heading level={4} fontWeight="bold" textAlign="center">
        Terms of Service
      </Heading>
    </CustomCard>
    <CustomCard>
      <Text textAlign="justify">
        Terms of Service This Terms of Service Agreement ("Agreement") is
        entered into by and between Nimbus S.A de C.V. ("Provider") and each
        Habitat affiliate ("Client") (collectively referred to as "Parties"). 1.
        Services Provider shall provide Client with a website known as Habitat
        App ("App") for the purpose of receiving, storing, and processing
        applicant data. Provider is responsible for maintaining the App and
        storing the data. Provider may introduce new features to the App, which
        may incur additional costs. 2. Client Responsibilities Client
        acknowledges and agrees that they are solely responsible for handling
        and complying with applicable laws regarding the data collected from
        applicants. Any conflicts or legal issues arising from the misuse of
        data shall be the sole responsibility of the Client. 3. Fees and
        Payments Provider may introduce new charges for new features. Payments
        shall be made via wire transfer or through the services of Paddle, a
        merchant of record providing services to Nimbus. 4. Intellectual
        Property Provider retains sole ownership of the Habitat App. Client
        shall not copy, replicate, or claim ownership of the App. 5. Data
        Privacy and Security Provider will collect basic information from each
        Habitat affiliate, such as address, employee names, and emails, solely
        for payment processing purposes. Provider shall store this data securely
        and shall not share it with any third parties. 6. Termination Provider
        reserves the right to terminate the agreement with any Habitat affiliate
        in the event of a breach of contract or non-payment. Prior notice will
        be provided, and a fee may be charged for extracting application data
        from the App. 7. Governing Law and Jurisdiction This Agreement shall be
        governed by and construed in accordance with the laws of El Salvador.
        Any disputes arising from this Agreement shall be subject to the
        exclusive jurisdiction of the courts of El Salvador. 8. Additional
        Clauses Please consult with a legal professional to determine if there
        are any additional clauses or provisions specific to your requirements
        that should be included in this Agreement.
      </Text>
    </CustomCard>
  </Flex>
);

export default TermsPage;
