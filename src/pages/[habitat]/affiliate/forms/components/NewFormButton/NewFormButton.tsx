/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from 'components/CustomButton/CustomButton';
import { MdAdd } from 'react-icons/md';
import Modal from 'components/Modal';
import {
  Text,
  View,
  Flex,
  Button,
  TextField,
  TextAreaField,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import FileInput from 'components/FileInput';
import { DataStore } from '@aws-amplify/datastore';
import { RootForm, RootFormStatusTypes } from 'models';

function NewFormButton() {
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());

    try {
      await DataStore.save(
        new RootForm({
          name: formDataObject.name as string,
          status: RootFormStatusTypes.PENDING,
          description: formDataObject.description as string,
        })
      );
    } catch (error) {
      console.log(`Error creating new form: ${error}`);
    }

    event.target.reset();
  }

  const [modalOpen, setModalOpen] = useState(false);

  const newFormModal = (
    <Modal
      title="Create a new form 📝"
      open={modalOpen}
      onClickClose={() => {
        setModalOpen(!modalOpen);
      }}
      width="50%"
    >
      <Flex direction="column" gap="30px">
        <View className="theme-subtitle-s2">
          <Text as="span" alignSelf="center">
            Creating a form is the first step to take your paper applications
            online. Please take some time to answer the following questions.
          </Text>
        </View>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="40px">
            <TextField
              name="name"
              label="What is your form's name?"
              placeholder="Homeownership Program Application"
              required
            />
            <TextAreaField
              name="description"
              label="Can you describe your form in a couple of words?"
              placeholder="The form is an application that determines if a family is fit to participate in Habitat for Humanity's Homeownership Program. These are received twice a year and reviewed by Habitat workers."
              required
            />
            <Flex direction="row" justifyContent="end">
              <Button type="submit">Submit</Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Modal>
  );

  return (
    <>
      {newFormModal}
      <CustomButton icon={<MdAdd />} onClick={() => setModalOpen(!modalOpen)}>
        New Form
      </CustomButton>
    </>
  );
}

export default NewFormButton;
