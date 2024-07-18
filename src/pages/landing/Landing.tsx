import { Flex } from '@aws-amplify/ui-react';
import Nav from './components/Nav';
import Features from './components/Features';
import Hero from './components/Hero';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import Client from './components/Client';
import Pricing from './components/Pricing';

function Landing() {
  return (
    <Flex direction="column" width="100%" height="fit-content" gap="0px">
      <Nav />
      <Hero />
      <Features />
      <Client />
      <Pricing />
      <Faqs />
      <Footer />
    </Flex>
  );
}

export default Landing;
