import { Card, Flex, Text } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import LexicalEditor from 'components/LexicalEditor';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const NotePreview = ({ ownerID, createdAt, serializedEditorState }) => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const getEmail = async () => {
      const response = await API.get('userAPI', '/email', {
        queryStringParameters: {
          sub: ownerID,
        },
      });

      setEmail(response.email);
    };
    getEmail();
  }, [ownerID]);

  return (
    <Card variation="elevated">
      <Flex justifyContent="space-between">
        <Text>
          <b>Note by:</b> {email}
        </Text>
        <Text>{dayjs(createdAt).format('YYYY-MM-DD')}</Text>
      </Flex>
      <LexicalEditor serializedEditorState={serializedEditorState} />
    </Card>
  );
};

NotePreview.propTypes = {
  ownerID: PropTypes.string,
  createdAt: PropTypes.string,
  serializedEditorState: PropTypes.string,
};

export default NotePreview;
