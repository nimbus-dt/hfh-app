import {
  Heading,
  Flex,
  TextField,
  Button,
  Loader,
  Text,
} from '@aws-amplify/ui-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { API } from 'aws-amplify';
import { useState } from 'react';
import Modal from 'components/Modal';
import CustomCard from 'components/CustomCard';
import contactSchema from './ContactPage.schema';

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onValid = async (data) => {
    setLoading(true);
    try {
      await API.post('public', '/email-admin', {
        body: {
          subject: 'HabitatApp Form Submission',
          body: `<ul>
            <li><b>How did you hear about HabitatApp?</b> ${data.howYouHearAboutHabitatApp}</li>
            <br/>
            <li><b>What is your name?</b> ${data.name}</li>
            <br/>
            <li><b>What is your email?</b> ${data.email}</li>
            <br/>
            <li><b>What is the name of your affiliate?</b> ${data.affiliateName}</li>
            <br/>
            <li><b>What is your role within this affiliate?</b> ${data.affiliateRole}</li>
            <br/>
            <li><b>In what state is your affiliate located?</b> ${data.affiliateState}</li>
            <br/>
            <li><b>How many houses do you build in one year?</b> ${data.housesBuildPerYear}</li>
            <br/>
            <li><b>Hoy many applications do you process in a year?</b> ${data.applicationProcessPerYear}</li>
            <br/>
            <li><b>Anything else?</b> ${data.anythingElse}</li>
          </ul>`,
        },
      });
      setSuccess(true);
      reset();
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleOnCloseErrorModal = () => setError(false);

  const handleOnCloseSuccessModal = () => setSuccess(false);

  return (
    <Flex direction="column" paddingBottom="1rem" paddingTop="1rem">
      <CustomCard>
        <Heading level={4} fontWeight="bold" textAlign="center">
          Contact us
        </Heading>
      </CustomCard>
      <CustomCard>
        <Modal
          title="Alert"
          open={error}
          onClickClose={handleOnCloseErrorModal}
        >
          An error ocurred while sending the form.
        </Modal>
        <Modal
          title="Alert"
          open={success}
          onClickClose={handleOnCloseSuccessModal}
        >
          Thank you! We will reach out to you as soon as possible.
        </Modal>
        <form onSubmit={handleSubmit(onValid)}>
          <Flex direction="column">
            <TextField
              {...register('howYouHearAboutHabitatApp')}
              label="How did you hear about HabitatApp?"
              isRequired
            />
            <TextField
              {...register('name')}
              label="What is your name?"
              isRequired
            />
            <TextField
              {...register('email')}
              label="What is your email?"
              isRequired
              type="email"
              hasError={errors.email}
              errorMessage="Invalid email."
            />
            <TextField
              {...register('affiliateName')}
              label="What is the name of your affiliate?"
              isRequired
            />
            <TextField
              {...register('affiliateRole')}
              label="What is your role within this affiliate?"
              isRequired
            />
            <TextField
              {...register('affiliateState')}
              label="In what state is your affiliate located?"
              isRequired
            />
            <TextField
              {...register('housesBuildPerYear')}
              label="How many houses do you build in one year?"
              type="number"
              isRequired
            />
            <TextField
              {...register('applicationProcessPerYear')}
              label="How many applications do you process in a year?"
              type="number"
              isRequired
            />
            <TextField {...register('anythingElse')} label="Anything else?" />
            <Flex justifyContent="end">
              <Button variation="primary" type="submit" isDisabled={loading}>
                {loading ? (
                  <Flex alignItems="center">
                    <Loader />
                    <Text color="font.disabled">Sending</Text>
                  </Flex>
                ) : (
                  'Submit'
                )}
              </Button>
            </Flex>
          </Flex>
        </form>
      </CustomCard>
    </Flex>
  );
};

export default ContactPage;
