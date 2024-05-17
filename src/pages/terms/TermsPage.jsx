import { Heading, Flex } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';

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
      <Flex direction="column" gap="5px">
        <p>
          <strong>Effective date:</strong> 02/15/2024
        </p>
        <p>
          This Termos of Service Agreement ("Agreement") constitutes a binding
          agreement between HabitatApp and its affiliated entities collectively
          referred to as "Habitat Affiliates."
        </p>
        <p>
          <strong>1. Services</strong>
        </p>
        <p>
          HabitatApp shall provide Habitat Affiliates with a website known as
          HabitatApp ("App") for the purpose of receiving, storing, and
          processing applicant data. HabitatApp is responsible for maintaining
          the App and storing the data. HabitatApp may introduce new features to
          the App, which may incur additional costs.
        </p>
        <p>
          <strong>2. Habitat Affiliates Responsibilities</strong>
        </p>
        <p>
          Habitat Affiliates acknowledges and agrees that they are solely
          responsible for handling and complying with applicable laws regarding
          the data collected from applicants. Any conflicts or legal issues
          arising from the misuse of data shall be the sole responsibility of
          the Habitat Affiliates.
        </p>
        <p>
          <strong>3. Fees and Payments</strong>
        </p>
        <p>
          HabitatApp may introduce new charges for new features. Payments shall
          be made via wire transfer or through the services of Paddle, a
          merchant of record providing services to Nimbus.
        </p>
        <p>
          <strong>4. Intellectual Property</strong>
        </p>
        <p>
          HabitatApp retains sole ownership of the HabitatApp. Habitat
          Affiliates shall not copy, replicate, or claim ownership of the App.
        </p>
        <p>
          <strong>5. Data Privacy and Security</strong>
        </p>
        <p>
          HabitatApp will collect basic information from each Habitat affiliate,
          such as address, employee names, and emails, solely for payment
          processing purposes. HabitatApp shall store this data securely and
          shall not share it with any third parties.
        </p>
        <p>
          <strong>6. Termination</strong>
        </p>
        <p>
          HabitatApp reserves the right to terminate the agreement with any
          Habitat affiliate in the event of a breach of contract or non-payment.
          Prior notice will be provided, and a fee may be charged for extracting
          application data from the App.
        </p>
        <p>
          <strong>7. Contact Us</strong>
        </p>
        <p>
          If you have any questions, concerns, or requests regarding these Terms
          of Service or the handling of personal information, please contact us
          at{' '}
          <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
        </p>
      </Flex>
    </CustomCard>
  </Flex>
);

export default TermsPage;
