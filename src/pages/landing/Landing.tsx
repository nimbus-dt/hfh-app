import { View, Flex } from '@aws-amplify/ui-react';
import Nav from './components/Nav';
import Features from './components/Features';
import Hero from './components/Hero';

function Landing() {
  // Vars
  const nav = (
    <View height="116px">
      <Nav />
    </View>
  );

  const hero = (
    <View height="1083px" id="#hero">
      hero
    </View>
  );

  const features = (
    <View height="1112px" border="1px solid black">
      <Features />
    </View>
  );

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
    <Flex direction="column" width="100%" height="3374px" gap="0px">
      {nav}
      {hero}
      {features}
      {contact}
      {faq}
    </Flex>
  );
}

export default Landing;
