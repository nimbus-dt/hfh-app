import { Heading, Flex } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';

const DataPage = () => (
  <Flex
    direction="column"
    paddingBottom="1rem"
    paddingTop="1rem"
    alignItems="center"
  >
    <CustomCard>
      <Heading level={4} fontWeight="bold" textAlign="center">
        Data Sharing and Protection Policy
      </Heading>
    </CustomCard>
    <CustomCard>
      <Flex direction="column" gap="5px">
        <p>
          <strong>Effective date:</strong> 02/15/2024
        </p>
        <p>
          This Data Sharing and Protection Policy ("Policy") constitutes a
          binding agreement between HabitatApp and its affiliated entities
          collectively referred to as "Habitat Affiliates." This Policy governs
          the acquisition, storage, and safeguarding of data obtained through
          the HabitatApp platform in connection with Habitat for Humanity's
          Homeownership and Repairs programs.
        </p>
        <p>
          <strong>1. Ownership of Data:</strong>
        </p>
        <p>
          HabitatApp expressly acknowledges that it does not assert ownership
          over any data submitted through the application. All data collected
          and processed via the HabitatApp platform is unequivocally owned by
          the respective Habitat Affiliate to which it pertains. HabitatApp
          serves as a facilitator, providing tools for data collection,
          analysis, and management.
        </p>
        <p>
          <strong>2. Non-Sale of Data:</strong>
        </p>
        <p>
          HabitatApp explicitly states that it does not participate in the sale
          of any data collected through its application. The acquired data is
          strictly utilized for facilitating the Homeownership and Repairs
          programs and supporting the operational requirements of the respective
          Habitat Affiliates. HabitatApp is dedicated to maintaining the
          confidentiality and integrity of the information entrusted to its
          care.
        </p>
        <p>
          <strong>3. Data Protection Measures:</strong>
        </p>
        <p>
          HabitatApp utilizes Amazon Web Services (AWS) as its primary data
          storage and management provider, chosen for its cutting-edge data
          cybersecurity measures and compliance with industry standards.
          HabitatApp diligently implements robust security protocols to protect
          individual data from unauthorized access, disclosure, alteration, and
          destruction. The AWS servers used by HabitatApp are located in
          Virginia, USA.
        </p>
        <p>
          <strong>4. Access Control:</strong>
        </p>
        <p>
          HabitatApp incorporates stringent access controls within its
          application to limit data visibility exclusively to the authorized
          Habitat Affiliate responsible for accessing and managing the data.
          These measures are designed to mitigate the risk of unauthorized
          disclosure, ensuring the confidentiality of sensitive information.
        </p>
        <p>
          <strong>5. Data Encryption:</strong>
        </p>
        <p>
          HabitatApp employs industry-standard encryption protocols to safeguard
          data during both transmission and storage. This includes the use of
          secure socket layer (SSL) and Transport Layer Security (TLS)
          technologies for data in transit, coupled with encryption mechanisms
          for data at rest, adding an additional layer of protection against
          unauthorized interception or compromise.
        </p>
        <p>
          <strong>6. Data Retention and Disposal:</strong>
        </p>
        <p>
          HabitatApp adheres to a rigorous data retention policy, ensuring that
          information is retained only for the necessary duration to fulfill its
          intended purpose. The disposal of data occurs exclusively at the
          request of each respective Habitat Affiliate, providing them control
          over the timing and manner of data disposal. HabitatApp will securely
          and permanently undertake the disposal process in accordance with
          established data disposal practices upon affiliate request.
        </p>
        <p>
          <strong>7. Compliance with Applicable Laws:</strong>
        </p>
        <p>
          HabitatApp commits to compliance with all relevant data protection
          laws and regulations within the United States, including but not
          limited to the California Consumer Privacy Act (CCPA) and any other
          applicable data protection or privacy legislation in the jurisdictions
          where Habitat Affiliates operate.
        </p>
        <p>
          <strong>8. Changes to the Policy:</strong>
        </p>
        <p>
          HabitatApp retains the right to modify, amend, or update this Policy
          at its discretion. Notification of material changes to the Policy will
          be provided to affected parties. Continued use of the HabitatApp
          platform after the effective date of such changes signifies acceptance
          of the revised Policy.
        </p>
        <p>
          This Data Sharing and Protection Policy is an integral component of
          the contractual relationship between HabitatApp and its affiliates,
          emphasizing HabitatApp's commitment to the secure and responsible
          handling of data. For inquiries or further clarification regarding
          this Policy, please contact{' '}
          <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
        </p>
      </Flex>
    </CustomCard>
  </Flex>
);

export default DataPage;
