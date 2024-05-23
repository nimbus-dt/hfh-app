import { Flex, Text, useBreakpointValue } from '@aws-amplify/ui-react';
import Modal from 'components/Modal';
import { useState } from 'react';
import './style.css';

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [policy, setPolicy] = useState(0);
  const modalWidth = useBreakpointValue({
    base: '80%',
    large: '780px',
  });
  const policyTitles = [
    'Privacy Policy',
    'Terms of Service',
    'Data Sharing Policy',
  ];

  const privacyPolicy = (
    <div>
      <p>
        <strong>Effective date:</strong> 02/15/2024
      </p>
      <p>
        This Privacy Policy ("Policy") constitutes a binding agreement between
        HabitatApp and its affiliated entities collectively referred to as
        "Habitat Affiliates."This Policy applies to the collection, use, and
        disclosure of personal information by Provider in connection with the
        HabitatApp.
      </p>

      <p>
        <strong>1. Information We Collect</strong>
      </p>
      <p>
        We may collect the following types of personal information from Habitat
        Affiliates:
      </p>
      <ul>
        <li>
          Basic contact information, such as name, address, email, and phone
          number.
        </li>
        <li>
          Other information voluntarily provided by Habitat Affiliates for the
          purpose of using the HabitatApp.
        </li>
      </ul>

      <p>
        <strong>2. Use of Personal Information</strong>
      </p>
      <p>
        We may use the personal information collected from Habitat Affiliates
        for the following purposes:
      </p>
      <ul>
        <li>To provide and maintain the functionality of the HabitatApp.</li>
        <li>
          To communicate with Habitat Affiliates regarding updates, changes, or
          technical issues related to the App.
        </li>
        <li>To process payments and invoices.</li>
        <li>To improve and enhance the HabitatApp and develop new features.</li>
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
          To protect the rights, property, or safety of Provider, Habitat
          Affiliates, or others.
        </li>
      </ul>

      <p>
        <strong>4. Data Retention</strong>
      </p>
      <p>
        We retain personal information for as long as necessary to fulfill the
        purposes outlined in this Policy or as required by applicable laws. When
        personal information is no longer needed, we will securely dispose of or
        anonymize it.
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
        privacy policies, and we encourage Habitat Affiliates to review them. We
        do not assume any responsibility for the privacy practices of
        third-party services.
      </p>

      <p>
        <strong>7. Updates to the Privacy Policy</strong>
      </p>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on our website or communicated to Habitat Affiliates through the
        HabitatApp. Habitat Affiliates are advised to review this Policy
        periodically for any updates.
      </p>

      <p>
        <strong>8. Contact Us</strong>
      </p>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy or the handling of personal information, please contact us at{' '}
        <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
      </p>
    </div>
  );

  const termsOfService = (
    <div>
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
        HabitatApp ("App") for the purpose of receiving, storing, and processing
        applicant data. HabitatApp is responsible for maintaining the App and
        storing the data. HabitatApp may introduce new features to the App,
        which may incur additional costs.
      </p>
      <p>
        <strong>2. Habitat Affiliates Responsibilities</strong>
      </p>
      <p>
        Habitat Affiliates acknowledges and agrees that they are solely
        responsible for handling and complying with applicable laws regarding
        the data collected from applicants. Any conflicts or legal issues
        arising from the misuse of data shall be the sole responsibility of the
        Habitat Affiliates.
      </p>
      <p>
        <strong>3. Fees and Payments</strong>
      </p>
      <p>
        HabitatApp may introduce new charges for new features. Payments shall be
        made via wire transfer or through the services of Paddle, a merchant of
        record providing services to Nimbus.
      </p>
      <p>
        <strong>4. Intellectual Property</strong>
      </p>
      <p>
        HabitatApp retains sole ownership of the HabitatApp. Habitat Affiliates
        shall not copy, replicate, or claim ownership of the App.
      </p>
      <p>
        <strong>5. Data Privacy and Security</strong>
      </p>
      <p>
        HabitatApp will collect basic information from each Habitat affiliate,
        such as address, employee names, and emails, solely for payment
        processing purposes. HabitatApp shall store this data securely and shall
        not share it with any third parties.
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
        of Service or the handling of personal information, please contact us at{' '}
        <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
      </p>
    </div>
  );

  const dataPolicy = (
    <div>
      <p>
        <strong>Effective date:</strong> 02/15/2024
      </p>
      <p>
        This Data Sharing and Protection Policy ("Policy") constitutes a binding
        agreement between HabitatApp and its affiliated entities collectively
        referred to as "Habitat Affiliates." This Policy governs the
        acquisition, storage, and safeguarding of data obtained through the
        HabitatApp platform in connection with Habitat for Humanity's
        Homeownership and Repairs programs.
      </p>
      <p>
        <strong>1. Ownership of Data:</strong>
      </p>
      <p>
        HabitatApp expressly acknowledges that it does not assert ownership over
        any data submitted through the application. All data collected and
        processed via the HabitatApp platform is unequivocally owned by the
        respective Habitat Affiliate to which it pertains. HabitatApp serves as
        a facilitator, providing tools for data collection, analysis, and
        management.
      </p>
      <p>
        <strong>2. Non-Sale of Data:</strong>
      </p>
      <p>
        HabitatApp explicitly states that it does not participate in the sale of
        any data collected through its application. The acquired data is
        strictly utilized for facilitating the Homeownership and Repairs
        programs and supporting the operational requirements of the respective
        Habitat Affiliates. HabitatApp is dedicated to maintaining the
        confidentiality and integrity of the information entrusted to its care.
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
        destruction. The AWS servers used by HabitatApp are located in Virginia,
        USA.
      </p>
      <p>
        <strong>4. Access Control:</strong>
      </p>
      <p>
        HabitatApp incorporates stringent access controls within its application
        to limit data visibility exclusively to the authorized Habitat Affiliate
        responsible for accessing and managing the data. These measures are
        designed to mitigate the risk of unauthorized disclosure, ensuring the
        confidentiality of sensitive information.
      </p>
      <p>
        <strong>5. Data Encryption:</strong>
      </p>
      <p>
        HabitatApp employs industry-standard encryption protocols to safeguard
        data during both transmission and storage. This includes the use of
        secure socket layer (SSL) and Transport Layer Security (TLS)
        technologies for data in transit, coupled with encryption mechanisms for
        data at rest, adding an additional layer of protection against
        unauthorized interception or compromise.
      </p>
      <p>
        <strong>6. Data Retention and Disposal:</strong>
      </p>
      <p>
        HabitatApp adheres to a rigorous data retention policy, ensuring that
        information is retained only for the necessary duration to fulfill its
        intended purpose. The disposal of data occurs exclusively at the request
        of each respective Habitat Affiliate, providing them control over the
        timing and manner of data disposal. HabitatApp will securely and
        permanently undertake the disposal process in accordance with
        established data disposal practices upon affiliate request.
      </p>
      <p>
        <strong>7. Compliance with Applicable Laws:</strong>
      </p>
      <p>
        HabitatApp commits to compliance with all relevant data protection laws
        and regulations within the United States, including but not limited to
        the California Consumer Privacy Act (CCPA) and any other applicable data
        protection or privacy legislation in the jurisdictions where Habitat
        Affiliates operate.
      </p>
      <p>
        <strong>8. Changes to the Policy:</strong>
      </p>
      <p>
        HabitatApp retains the right to modify, amend, or update this Policy at
        its discretion. Notification of material changes to the Policy will be
        provided to affected parties. Continued use of the HabitatApp platform
        after the effective date of such changes signifies acceptance of the
        revised Policy.
      </p>
      <p>
        This Data Sharing and Protection Policy is an integral component of the
        contractual relationship between HabitatApp and its affiliates,
        emphasizing HabitatApp's commitment to the secure and responsible
        handling of data. For inquiries or further clarification regarding this
        Policy, please contact{' '}
        <a href="mailto:support@habitat-app.org">support@habitat-app.org</a>.
      </p>
    </div>
  );

  const policyTexts = [privacyPolicy, termsOfService, dataPolicy];
  const policyModal = (
    <Modal
      title={policyTitles[policy]}
      open={modalOpen}
      onClickClose={() => {
        setModalOpen(!modalOpen);
      }}
      width={modalWidth as string}
    >
      {policyTexts[policy]}
    </Modal>
  );

  return (
    <Flex
      direction="row"
      width="100%"
      height="fit-content"
      padding="10px"
      gap="8px"
      alignItems="center"
      justifyContent="end"
      backgroundColor="var(--amplify-colors-neutral-10)"
    >
      <Text
        padding="12px 16px"
        width="fit-content"
        height="fit-content"
        textAlign="center"
        color="var(--amplify-colors-neutral-10)"
        fontSize="12px"
      >
        Payment
      </Text>
      <Text
        padding="12px 16px"
        width="fit-content"
        height="fit-content"
        textAlign="center"
        color="var(--amplify-colors-neutral-60)"
        fontSize="12px"
        onClick={() => {
          setPolicy(0);
          setModalOpen(!modalOpen);
        }}
        className="policy"
      >
        Privacy Policy
      </Text>
      <Text
        padding="12px 16px"
        width="fit-content"
        height="fit-content"
        textAlign="center"
        color="var(--amplify-colors-neutral-60)"
        fontSize="12px"
        onClick={() => {
          setPolicy(1);
          setModalOpen(!modalOpen);
        }}
        className="policy"
      >
        Terms of Service
      </Text>
      <Text
        padding="12px 16px"
        width="fit-content"
        height="fit-content"
        textAlign="center"
        color="var(--amplify-colors-neutral-60)"
        fontSize="12px"
        onClick={() => {
          setPolicy(2);
          setModalOpen(!modalOpen);
        }}
        className="policy"
      >
        Data Sharing Policy
      </Text>
      {modalOpen && policyModal}
    </Flex>
  );
}

export default Footer;
