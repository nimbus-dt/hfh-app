/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { DataStore } from 'aws-amplify';
import {
  Flex,
  Button,
  Card,
  Heading,
  Text,
  Image,
  TextField,
  Divider,
} from '@aws-amplify/ui-react';
import { BiUser, BiSupport } from 'react-icons/bi';
import { AiFillCloud, AiFillCheckCircle } from 'react-icons/ai';
import { ContactForm } from '../../models';
import logoDigital from '../../assets/images/digital.jpg';

import nimbusLogo from '../../assets/images/nimbus-logo.png';

export function LandingLayout() {
  const contactButton = (
    <Button backgroundColor="white" onClick={() => handleScrollToContactForm()}>
      Contact us
    </Button>
  );

  function handleScrollToContactForm() {
    const contactFormSection = document.getElementById('contactFormSection');
    if (contactFormSection) {
      contactFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const nav = (
    <Flex
      direction="row"
      width="100%"
      backgroundColor="white"
      alignItems="center"
    >
      <Flex width="25%" height="100%">
        <Image alt="Habitat Logo" src={nimbusLogo} height="100%" width="100%" />
      </Flex>
      <Flex
        width="75%"
        justifyContent="flex-end"
        height="100%"
        marginRight="30px"
      >
        {contactButton}
      </Flex>
    </Flex>
  );

  const hero = (
    <Card
      width="100%"
      height="500px"
      backgroundImage="linear-gradient(to bottom, #ffffff, #55B949)"
    >
      <Flex direction="column" alignItems="center">
        <Heading level="1" fontWeight="bold">
          Digitally transform
        </Heading>
        <Heading level="1" fontWeight="bold" marginBottom="10px">
          your Habitat affiliate
        </Heading>
        <Heading
          level="4"
          fontWeight="normal"
          marginBottom="30px"
          width="40%"
          textAlign="center"
        >
          With our platform you can take all your processes digital, storing all
          of your affiliate's data securely in the cloud
        </Heading>
        {contactButton}
      </Flex>
    </Card>
  );

  const explanation = (
    <Flex direction="column">
      <Flex
        direction="row"
        alignItems="center"
        width="100%"
        justifyContent="space-between"
        padding="20px"
      >
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex direction="column">
            <Flex width="100%" justifyContent="center">
              <BiUser size="50px" />
            </Flex>
            <Heading textAlign="center" level="3">
              Online PreScreens
            </Heading>
            <Text textAlign="center">
              Never send a paper pre-screen ever again. With our online
              platform, applicants can:
            </Text>
            <Flex direction="column" width="100%" alignItems="center">
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Apply through any device</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Submit documentation</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Check their application status</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex direction="column">
            <Flex width="100%" justifyContent="center">
              <AiFillCloud size="50px" />
            </Flex>
            <Heading textAlign="center" level="3">
              Cloud Storage
            </Heading>
            <Text textAlign="center">
              Store all of your affiliate's data in the cloud. Mantain
              pre-screen records and:
            </Text>
            <Flex direction="column" width="100%" alignItems="center">
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Revise them wherever</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Notify applicant's of any decision</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Download data for reporting</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Card variation="outlined" backgroundColor="lightgray" width="30% ">
          <Flex direction="column">
            <Flex width="100%" justifyContent="center">
              <BiSupport size="50px" />
            </Flex>
            <Heading textAlign="center" level="3">
              Support Service
            </Heading>
            <Text textAlign="center">
              Rely on a trusted support service, available consistently. We will
              help you:
            </Text>
            <Flex direction="column" width="100%" alignItems="center">
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Access the website</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Customize your requirements</Text>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="80%"
              >
                <Flex width="20%">
                  <AiFillCheckCircle />
                </Flex>
                <Flex width="75%">
                  <Text>Troubleshoot any problem</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );

  const longTerm = (
    <Card width="100%" height="fit-content">
      <Flex direction="row" width="100%" alignItems="center">
        <Flex
          direction="column"
          alignItems="center"
          width="50%"
          height="fit-content"
        >
          <Image alt="Digital logo" src={logoDigital} height="60%" />
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          width="50%"
          alignContent="center"
          height="fit-content"
        >
          <Heading level="1" fontWeight="bold" marginTop="80px">
            Long term
          </Heading>
          <Heading level="1" fontWeight="bold" marginBottom="10px">
            partnerships
          </Heading>
          <Heading
            level="4"
            fontWeight="normal"
            marginBottom="30px"
            width="100%"
            textAlign="start"
          >
            Our vision is to develop a platform that will digitally transform
            not only the pre-screen process, but also all other aspects of the
            Homeownership Application Process, Repairs Program and more...
            creating your affiliate's digital hub
          </Heading>
        </Flex>
      </Flex>
    </Card>
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const data = {
      name: form.elements.name.value,
      affiliate: form.elements.affiliate.value,
      email: form.elements.email.value,
    };

    await DataStore.save(
      new ContactForm({
        name: data.name,
        affiliate: data.affiliate,
        contactEmail: data.email,
      })
    );

    event.target.reset();
  }

  const contactForm = (
    <Card width="100%" height="500px" id="contactFormSection">
      <Heading level="1" fontWeight="bold">
        Contact us!
      </Heading>
      <Heading level="4" fontWeight="normal" marginBottom="30px">
        We will get back to you as soon as possible
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex direction="column" alignItems="center">
          <TextField
            name="name"
            label="What is your name?"
            width="100%"
            placeholder="John Doe"
            isRequired
          />
          <TextField
            name="affiliate"
            label="What Habitat affiliate do you represent?"
            width="100%"
            placeholder="Anytown Habitat for Humanity"
            isRequired
          />
          <TextField
            name="email"
            label="What is the best email to reach you?"
            width="100%"
            placeholder="anytown@habitat.org"
            isRequired
          />
          <Flex alignContent="start" width="100%">
            <Button type="submit" variation="primary">
              Send
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );

  const footer = (
    <Card width="100%" height="200px">
      <Flex direction="row">
        <Card width="25%">
          <Flex direction="column">
            <Image
              alt="Habitat Logo"
              src={nimbusLogo}
              height="100%"
              width="100%"
            />
            <Text color="gray">
              Copyright © 2023 Nimbus S.A de C.V. All rights reserved.
            </Text>
          </Flex>
        </Card>
        <Card width="50%">
          <Flex direction="column">
            <Heading level="3">Our team</Heading>
            <Text>
              Nimbus is a start-up founded by Columbia University students, with
              the desire to help businesses around the world digitally transform
              their processes. We are currently working with Habitat for
              Humanity affiliates to help them streamline their application
              process.
            </Text>
            <Heading level="3">Our technologies</Heading>
            <Text>
              We rely on the latest technologies to develop our products. We
              specialize in AWS Services to provide the best experience to our
              clients.
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Card>
  );

  return (
    <Flex width="100%" direction="column">
      {nav}
      {hero}
      {explanation}
      {longTerm}
      {contactForm}
      <Divider />
      {footer}
    </Flex>
  );
}
