import { Card, Flex, Image } from '@aws-amplify/ui-react';
import useScrollToTopOnRouteChange from 'hooks/utils/useScrollToTopOnRouteChange';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logoHabitat from '../../../assets/images/trace.svg';

export function NewLandingLayout({ children }) {
  const scrollViewReference = useRef(null);
  useScrollToTopOnRouteChange(scrollViewReference);

  return (
    <div
      style={{ height: 'auto', minHeight: '100vh' }}
      ref={scrollViewReference}
    >
      <Flex
        direction="column"
        alignItems="center"
        minHeight="100vh"
        paddingBottom="1rem"
        gap="0rem"
        backgroundColor="lightgray"
      >
        <Card wrap width="100%" backgroundColor="#55B949" padding="0">
          <Flex direction="row" justifyContent="space-between" alignItems="">
            <Link to="/">
              <Image
                alt="Habitat Logo"
                src={logoHabitat}
                height="100%"
                marginLeft="-10px"
                backgroundColor="black"
              />
            </Link>
          </Flex>
        </Card>
        {children}
      </Flex>
    </div>
  );
}

NewLandingLayout.propTypes = {
  children: PropTypes.node,
};
