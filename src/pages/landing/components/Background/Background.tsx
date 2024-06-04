import { Flex } from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

interface BackgroundProps {
  id: string;
  children: ReactNode;
  bgColor: string;
  direction: 'column' | 'row';
  gap: string;
}

function Background({
  bgColor,
  children,
  direction,
  gap,
  id,
}: BackgroundProps) {
  return (
    <Flex
      id={id}
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="32px"
      width="100%"
      padding={{
        base: '4.5rem 3rem',
      }}
      backgroundColor={bgColor}
    >
      <Flex
        maxWidth={{
          base: '100%',
          large: '46rem',
          xl: '64rem',
          xxl: '80rem',
        }}
        direction={direction}
        justifyContent="center"
        alignItems="center"
        gap={gap}
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default Background;
