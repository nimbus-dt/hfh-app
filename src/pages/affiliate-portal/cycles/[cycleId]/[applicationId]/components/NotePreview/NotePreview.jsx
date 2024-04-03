import { Button, Card, Flex, Text } from '@aws-amplify/ui-react';
import { API } from 'aws-amplify';
import LexicalEditor from 'components/LexicalEditor';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { checkOverflow } from 'utils/dom';

const NotePreview = ({ ownerID, createdAt, serializedEditorState }) => {
  const [email, setEmail] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  const cardRef = useRef(null);

  const handleExpandedChange = () =>
    setExpanded((prevExpanded) => !prevExpanded);

  const shouldRenderExpandedButton = useMemo(
    () =>
      cardRef.current != null && checkOverflow(cardRef.current) && !expanded,
    [expanded, cardRef.current, height]
  );

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

  useEffect(() => {
    if (cardRef.current) {
      const resizeObserver = new ResizeObserver((entries) =>
        setHeight(entries[0].target.clientHeight)
      );
      resizeObserver.observe(cardRef.current);
    }
  }, [cardRef.current]);

  return (
    <Card
      variation="elevated"
      maxHeight={expanded ? 'none' : '15rem'}
      overflow="hidden"
      position="relative"
      ref={cardRef}
    >
      {shouldRenderExpandedButton && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(0deg, rgba(255,255,255,0.95) 6%, rgba(255,255,255,0) 100%)',
          }}
          justifyContent="center"
          alignItems="end"
          padding="1.5rem"
        >
          <Button
            borderStyle="none"
            backgroundColor="transparent"
            onClick={handleExpandedChange}
          >
            <Flex alignItems="center" gap="0.25rem">
              <MdArrowDownward />
              Expand
            </Flex>
          </Button>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>
          <b>Note by:</b> {email}
        </Text>
        <Text>{dayjs(createdAt).format('YYYY-MM-DD')}</Text>
      </Flex>
      <LexicalEditor serializedEditorState={serializedEditorState} />

      {expanded && (
        <Flex justifyContent="center">
          <Button
            borderStyle="none"
            backgroundColor="transparent"
            onClick={handleExpandedChange}
          >
            <Flex alignItems="center" gap="0.25rem">
              <MdArrowUpward />
              Collapse
            </Flex>
          </Button>
        </Flex>
      )}
    </Card>
  );
};

NotePreview.propTypes = {
  ownerID: PropTypes.string,
  createdAt: PropTypes.string,
  serializedEditorState: PropTypes.string,
};

export default NotePreview;
