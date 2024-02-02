import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Flex, Text, View } from '@aws-amplify/ui-react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';

const ExpandableQuestion = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => setOpen((previousOpen) => !previousOpen);

  return (
    <View>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="20px">{title}</Text>
        <View style={{ cursor: 'pointer' }} onClick={handleOnClick}>
          {open ? (
            <MdArrowUpward size="1.5rem" />
          ) : (
            <MdArrowDownward size="1.5rem" />
          )}
        </View>
      </Flex>
      <Divider borderColor="black" marginTop="1rem" />
      {open && <Text padding="0.5rem">{content}</Text>}
    </View>
  );
};

ExpandableQuestion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default ExpandableQuestion;
