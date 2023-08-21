import {
  Flex,
  Card,
  Image,
  Heading,
  Button,
  useBreakpointValue,
  TextField,
} from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import logo from '../../assets/images/nimbus-logo.png';
import { ContactForm } from '../../models';

export function LandingContact() {
  const responsiveBool = useBreakpointValue({
    base: true,
    small: true,
    medium: true,
    large: false,
    xl: false,
    xxl: false,
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const data = {
      name: form.elements.name.value,
      affiliate: form.elements.affiliate.value,
      email: form.elements.email.value,
    };

    try {
      await DataStore.save(
        new ContactForm({
          name: data.name,
          affiliate: data.affiliate,
          contactEmail: data.email,
        })
      );
    } catch (error) {
      console.log(`Error saving contact form: ${error}`);
    }

    event.target.reset();
  }

  const contactForm = (
    <Card
      width="100%"
      // height="500px"
      id="contactFormSection"
      // width={responsiveBool ? '90%' : '85%'}
      height={responsiveBool ? 'fit-content' : '80%'}
      // variation="elevated"
      marginTop="5%"
      marginBottom="5%"
    >
      <Heading level="1" fontWeight="bold">
        Contact us!
      </Heading>
      <Heading level="4" fontWeight="normal" marginBottom="30px">
        Schedule a demo or ask us any questions
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

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      backgroundColor="#34548c"
      alignItems="center"
      alignContent="center"
    >
      <Card
        width={responsiveBool ? '90%' : '85%'}
        height={responsiveBool ? 'fit-content' : '80%'}
        variation="elevated"
        marginTop="5%"
        marginBottom="5%"
      >
        <Flex
          direction={responsiveBool ? 'column' : 'row'}
          width="100%"
          height="100%"
          justifyContent={responsiveBool ? 'center' : 'space-between'}
        >
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={logo} alt="Nimbus Logo" />
          </Flex>
          <Flex
            direction="column"
            width={responsiveBool ? '100%' : '50%'}
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            {contactForm}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
