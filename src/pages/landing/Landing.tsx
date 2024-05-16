import { View, Flex } from '@aws-amplify/ui-react';
import Nav from './components/Nav';
import Features from './components/Features';
import Hero from './components/Hero';
import Contact from './components/Contact';

function Landing() {
  const faq = (
    <View height="732px" border="1px solid black">
      faq
    </View>
  );

  return (
    <Flex direction="column" width="100%" height="fit-content" gap="0px">
      <Nav />
      <Hero />
      <Features />
      <Contact />
      {faq}
    </Flex>
  );
}

export default Landing;
