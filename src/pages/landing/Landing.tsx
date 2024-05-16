import { View, Flex } from '@aws-amplify/ui-react';
import Nav from './components/Nav';
import Features from './components/Features';
import Hero from './components/Hero';

function Landing() {
  // Vars
  const contact = (
    <View height="331px" border="1px solid black">
      contact
    </View>
  );

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
      {contact}
      {faq}
    </Flex>
  );
}

export default Landing;
