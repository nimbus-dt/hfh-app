import { Flex, Text } from '@aws-amplify/ui-react';
import clientPicture from 'assets/images/client-picture.png';
import CustomButton from 'components/CustomButton/CustomButton';
import './style.css';

function Client() {
  return (
    <Flex
      backgroundColor="var(--amplify-colors-primary-100)"
      width="100%"
      height="fit-content"
      justifyContent="center"
      gap="32px"
      padding={{ base: '72px 24px', medium: '72px 48px', large: '72px 128px' }}
      direction="column"
      alignItems="start"
      id="clients"
    >
      <Text
        textAlign="center"
        width="100%"
        height="fit-content"
        fontWeight="medium"
        color="#FFFDFD"
        fontSize="54px"
      >
        Hear what other affiliates say
      </Text>
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        gap="40px"
        width="100%"
        height="fit-content"
        padding="0px"
        alignContent="center"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          direction="row"
          width="100%"
          height={{ base: '386px', xl: '100%' }}
          alignSelf="center"
          className="image-container"
        >
          <img
            alt="application"
            src={clientPicture}
            className="responsive-image"
          />
        </Flex>
        <Flex
          direction="column"
          gap="56px"
          alignContent="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Flex
            direction="column"
            width="100%"
            height="fit-content"
            alignContent="center"
            justifyContent="center"
            gap="12px"
          >
            <Text
              width="100%"
              height="fit-content"
              fontWeight="normal"
              fontSize="24px"
              color="var(--amplify-colors-neutral-10)"
            >
              Working with the Habitat App team has been a tremendous
              experience. With the, we have quickly worked on a revolutionizing
              our use of technology in our operations.
            </Text>
            <Text
              width="100%"
              height="fit-content"
              fontWeight="lighter"
              fontSize="20px"
              color="var(--amplify-colors-neutral-10)"
            >
              Susan Meadows <br /> Family Services Coordinator for Alachua
              Habitat for Humanity in Gainesville
            </Text>
          </Flex>
          <CustomButton
            style={{
              width: 'fit-content',
              height: 'fit-content',
              fontSize: '18px',
              padding: '12px 16px',
              color: 'var(--amplify-colors-primary-100)',
              backgroundColor: 'var(--amplify-colors-neutral-10)',
            }}
            className="signUp"
            onClick={() => {
              window.location.href =
                'https://share.hsforms.com/1lqoUQWsfRm2AJVquaEMNCwqw1cl';
            }}
          >
            Sign up
          </CustomButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Client;
