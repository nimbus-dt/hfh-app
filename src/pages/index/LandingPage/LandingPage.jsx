import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  View,
} from '@aws-amplify/ui-react';
import React from 'react';
import rectangle from 'assets/images/rectangle_1.png';
import laptop from 'assets/images/macbook_pro.png';
import smarthphone from 'assets/images/iphone_se.png';
import { HiOutlineCalculator } from 'react-icons/hi2';
import { TfiWorld } from 'react-icons/tfi';
import { FiUserCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import FeaturePreview from './components/FeaturePreview';
import ExpandableQuestion from './components/ExpandableQuestion';

const LandingPage = () => (
  <Flex width="100%">
    <View width="100%" position="relative">
      <View position="absolute" width="100%" style={{ zIndex: 1 }}>
        <View height="510px" backgroundColor="#34548C" />
        <Image width="100%" src={rectangle} />
      </View>
      <View position="absolute" style={{ zIndex: 100 }} width="100%">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="650px"
          margin="auto"
          gap="2rem"
          padding={{ base: '1rem', small: '3rem' }}
        >
          <Heading
            fontSize="40px"
            textAlign="center"
            fontWeight="bold"
            color="white"
          >
            Forget about paper applications
          </Heading>
          <Text as="p" textAlign="center" fontSize="20px" color="white">
            HabitatApp is here to digitally transform how affiliates conduct
            their Homeownership Program. Contact us now and get a 1 month free
            trial.
          </Text>
          <Link to="/contact">
            <Button backgroundColor="black" color="white">
              Contact Us
            </Button>
          </Link>
        </Flex>
        <View
          width={{ base: '80%', small: '70%' }}
          style={{ aspectRatio: '5/3' }}
          position="relative"
          margin="auto"
          marginTop="2rem"
          marginBottom="2rem"
        >
          <Image
            position="absolute"
            top="0"
            left="0"
            src={laptop}
            width="90%"
          />
          <Image
            width="25%"
            position="absolute"
            bottom="0"
            right="0"
            src={smarthphone}
          />
        </View>
        <Flex
          width="70%"
          margin="auto"
          direction={{
            base: 'column',
            small: 'row',
          }}
          gap="2rem"
          marginTop="4rem"
          marginBottom="4rem"
        >
          <FeaturePreview
            icon={<HiOutlineCalculator size="3rem" />}
            title="Advanced Calculations"
            description="Automate essential calculations like AMI, household income, and
              debt-to-income ratios."
          />
          <FeaturePreview
            icon={<TfiWorld size="3rem" />}
            title="Access anywhere"
            description="Access the app through any device with internet - phone, laptop or tablet."
          />
          <FeaturePreview
            icon={<FiUserCheck size="3rem" />}
            title="Expert guides"
            description="Our experience with other affiliates and technology will help us guide you best."
          />
        </Flex>
        <View
          width={{ base: '80%', small: '65%' }}
          margin="auto"
          marginBottom="2rem"
        >
          <Heading fontSize="40px" fontWeight="bold">
            FAQ
          </Heading>
          <Flex
            direction="column"
            width={{ base: '90%', small: '75%' }}
            margin="auto"
            gap="2rem"
          >
            <ExpandableQuestion
              title="What is HabitatApp?"
              content="Cillum laborum aliquip labore do. Proident et irure dolor laboris irure sit proident magna adipisicing duis eu sint. Id non commodo eiusmod Lorem excepteur pariatur in ullamco ipsum aliqua quis labore ex veniam."
            />
            <ExpandableQuestion
              title="How can I gain access to HabitatApp?"
              content="Cillum laborum aliquip labore do. Proident et irure dolor laboris irure sit proident magna adipisicing duis eu sint. Id non commodo eiusmod Lorem excepteur pariatur in ullamco ipsum aliqua quis labore ex veniam."
            />
          </Flex>
        </View>
      </View>
    </View>
  </Flex>
);

export default LandingPage;
