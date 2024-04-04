import { Heading, Flex, Text } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';

const PrivacyPage = () => (
  <Flex
    direction="column"
    paddingBottom="1rem"
    paddingTop="1rem"
    alignItems="center"
  >
    <CustomCard>
      <Heading level={4} fontWeight="bold" textAlign="center">
        Privacy Policy
      </Heading>
    </CustomCard>
    <CustomCard>
      <Flex direction="column" gap="5px">
        <p>
          This Privacy Policy ("Policy") outlines how Nimbus S.A de C.V.
          ("Provider," "we," or "us") collects, uses, and protects personal
          information obtained through the use of the HabitatApp by Habitat
          affiliates ("Clients," "you," or "your"). This Policy applies to the
          collection, use, and disclosure of personal information by Provider in
          connection with the HabitatApp.
        </p>

        <p>
          <strong>1. Information We Collect</strong>
        </p>
        <p>
          We may collect the following types of personal information from
          Clients:
        </p>
        <ul>
          <li>
            Basic contact information, such as name, address, email, and phone
            number.
          </li>
          <li>
            Other information voluntarily provided by Clients for the purpose of
            using the HabitatApp.
          </li>
        </ul>

        <p>
          <strong>2. Use of Personal Information</strong>
        </p>
        <p>
          We may use the personal information collected from Clients for the
          following purposes:
        </p>
        <ul>
          <li>To provide and maintain the functionality of the HabitatApp.</li>
          <li>
            To communicate with Clients regarding updates, changes, or technical
            issues related to the App.
          </li>
          <li>To process payments and invoices.</li>
          <li>
            To improve and enhance the HabitatApp and develop new features.
          </li>
        </ul>

        <p>
          <strong>3. Data Sharing and Disclosure</strong>
        </p>
        <p>
          We do not sell, trade, or rent personal information to third parties.
          However, we may disclose personal information in the following
          circumstances:
        </p>
        <ul>
          <li>With the explicit consent of the Client.</li>
          <li>
            To comply with legal obligations, such as responding to lawful
            requests or legal processes.
          </li>
          <li>
            To protect the rights, property, or safety of Provider, Clients, or
            others.
          </li>
        </ul>

        <p>
          <strong>4. Data Retention</strong>
        </p>
        <p>
          We retain personal information for as long as necessary to fulfill the
          purposes outlined in this Policy or as required by applicable laws.
          When personal information is no longer needed, we will securely
          dispose of or anonymize it.
        </p>

        <p>
          <strong>5. Data Security</strong>
        </p>
        <p>
          We implement reasonable security measures to protect personal
          information from unauthorized access, use, or disclosure. However, no
          method of data transmission over the internet or electronic storage is
          100% secure, and we cannot guarantee absolute security.
        </p>

        <p>
          <strong>6. Third-Party Services</strong>
        </p>
        <p>
          The HabitatApp may include links to third-party websites or services
          that are not operated by us. These third-party services have their own
          privacy policies, and we encourage Clients to review them. We do not
          assume any responsibility for the privacy practices of third-party
          services.
        </p>

        <p>
          <strong>7. Updates to the Privacy Policy</strong>
        </p>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on our website or communicated to Clients through the
          HabitatApp. Clients are advised to review this Policy periodically for
          any updates.
        </p>

        <p>
          <strong>8. Contact Us</strong>
        </p>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or the handling of personal information, please contact
          us at{' '}
          <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
        </p>
      </Flex>
    </CustomCard>
  </Flex>
);

export default PrivacyPage;
