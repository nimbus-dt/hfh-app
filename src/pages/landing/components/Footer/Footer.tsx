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

  const policyTexts = ['<strong>cat</strong>', '<h1>hey</h1>', '<h1>hey</h1>'];
  const policyModal = (
    <Modal
      title={policyTitles[policy]}
      open={modalOpen}
      onClickClose={() => {
        setModalOpen(!modalOpen);
      }}
      width={modalWidth as string}
    >
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: policyTexts[policy],
        }}
      />
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
