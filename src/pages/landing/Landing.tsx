import { Flex } from '@aws-amplify/ui-react';
import Nav from './components/Nav';
import Features from './components/Features';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Faqs from './components/Faqs';

function Landing() {
  return (
    <Flex direction="column" width="100%" height="fit-content" gap="0px">
      <Nav />
      <Hero />
      <Features />
      <Contact />
      <Faqs />
    </Flex>
  );
}

export default Landing;
