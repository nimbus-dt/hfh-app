import React from 'react';
import PropTypes from 'prop-types';
import { Button, Flex, ScrollView, Text, View } from '@aws-amplify/ui-react';
import { MdClose } from 'react-icons/md';

const Modal = ({ title, children, onClickClose, open, width }) => {
  const handleOnClickBlur = (event) => {
    event.stopPropagation();
    onClickClose();
  };
  return (
    open && (
      <Flex
        backgroundColor="rgba(0,0,0,0.25)"
        as="div"
        position="fixed"
        width="100vw"
        height="100vh"
        top="0"
        left="0"
        justifyContent="center"
        alignItems="center"
        margin="0"
        style={{
          backdropFilter: 'blur(0.1rem)',
          zIndex: 10,
        }}
        onClick={handleOnClickBlur}
      >
        <Flex
          onClick={(event) => event.stopPropagation()}
          direction="column"
          backgroundColor="white"
          opacity={1}
          paddingTop="0"
          borderRadius="medium"
          width={width || 'fit-content'}
          maxHeight="90%"
          overflow="hidden"
          gap="unset"
        >
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor="lightgray"
            borderStyle="solid"
            padding="1rem"
            style={{
              borderWidth: '0',
              borderBottomWidth: 'thin',
            }}
            backgroundColor="white"
          >
            <Text fontWeight="bold" fontSize="1.25rem" flex="1">
              {title}
            </Text>
            <Button
              padding="0.25rem"
              title="Close"
              borderWidth="0"
              onClick={onClickClose}
            >
              <MdClose size="1.5rem" />
            </Button>
          </Flex>
          <ScrollView>
            <View padding="1.5rem">{children}</View>
          </ScrollView>
        </Flex>
      </Flex>
    )
  );
};

Modal.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  onClickClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      base: PropTypes.string,
      small: PropTypes.string,
      medium: PropTypes.string,
      large: PropTypes.string,
      xl: PropTypes.string,
      xxl: PropTypes.string,
    }),
  ]),
};

export default Modal;
