import { Button, Card, Flex } from '@aws-amplify/ui-react';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { checkOverflow } from 'utils/dom';

interface IProperties {
  children: ReactNode;
}

const ExpandableCardWithGradient = ({ children }: IProperties) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);

  const cardRef = useRef(null);

  const handleExpandedChange = () =>
    setExpanded((prevExpanded) => !prevExpanded);

  const shouldRenderExpandedButton = useMemo(
    () =>
      cardRef.current != null && checkOverflow(cardRef.current) && !expanded,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [expanded, cardRef.current, height]
  );

  useEffect(() => {
    if (cardRef.current) {
      const resizeObserver = new ResizeObserver((entries) =>
        setHeight(entries[0].target.clientHeight)
      );
      resizeObserver.observe(cardRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            pointerEvents: 'none',
          }}
          justifyContent="center"
          alignItems="end"
          padding="1.5rem"
        >
          <Button
            borderStyle="none"
            backgroundColor="transparent"
            onClick={handleExpandedChange}
            style={{
              pointerEvents: 'auto',
            }}
          >
            <Flex alignItems="center" gap="0.25rem">
              <MdArrowDownward />
              Expand
            </Flex>
          </Button>
        </Flex>
      )}

      {children}

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

export default ExpandableCardWithGradient;
