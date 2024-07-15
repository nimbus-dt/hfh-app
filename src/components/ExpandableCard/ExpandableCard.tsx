import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import { checkOverflow } from 'utils/dom';
import style from './ExpandableCard.module.css';

interface IProperties {
  children: ReactNode;
}

const ExpandableCard = ({ children }: IProperties) => {
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
    if (!cardRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) =>
      setHeight(entries[0].target.clientHeight)
    );

    resizeObserver.observe(cardRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <View
      maxHeight={expanded ? 'none' : '15rem'}
      overflow="hidden"
      position="relative"
      ref={cardRef}
      className={`${style.expandableCard} ${expanded ? style.expanded : ''}`}
    >
      {shouldRenderExpandedButton && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(0deg, rgba(255,255,255,1) 25%, rgba(255,255,255,0) 55%)',
            pointerEvents: 'none',
          }}
          justifyContent="center"
          alignItems="end"
          padding="0.5rem"
        >
          <Button
            className={style.button}
            borderStyle="none"
            backgroundColor="transparent"
            onClick={handleExpandedChange}
            style={{
              pointerEvents: 'auto',
            }}
          >
            <Flex alignItems="center" gap="0.25rem" className="theme-button">
              Show More
              <MdOutlineArrowDropDown size="24px" />
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
            <Flex alignItems="center" gap="0.25rem" className="theme-button">
              <Text className={style.button}>Show Less</Text>
              <MdOutlineArrowDropUp size="24px" />
            </Flex>
          </Button>
        </Flex>
      )}
    </View>
  );
};

export default ExpandableCard;
