import { Flex, View } from '@aws-amplify/ui-react';

function LandingLayout() {
  const nav = (
    <View height="116px" border="1px solid black">
      nav
    </View>
  );

  const hero = (
    <View height="1083px" border="1px solid black">
      hero
    </View>
  );

  const features = (
    <View height="1112px" border="1px solid black">
      features
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

export default LandingLayout;
