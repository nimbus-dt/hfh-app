import CustomButton from 'components/CustomButton/CustomButton';
import { MdAdd } from 'react-icons/md';
import Modal from 'components/Modal';
import {
  Text,
  View,
  Loader,
  Flex,
  Button,
  SelectField,
  TextField,
  TextAreaField,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import FileInput from 'components/FileInput';

function NewFormButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const newFormModal = (
    <Modal
      title="Create a new form 📝"
      open={modalOpen}
      onClickClose={() => {
        setFiles([]);
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
        <form>
          <Flex direction="column" gap="40px">
            <TextField
              label="What is your form's name?"
              placeholder="Homeownership Program Application"
              required
            />
            <TextAreaField
              label="Can you describe your form in a couple of words?"
              placeholder="The form is an application that determines if a family is fit to participate in Habitat for Humanity's Homeownership Program. These are received twice a year and reviewed by Habitat workers."
              required
            />
            <FileInput
              label="Upload your paper application."
              maxFileCount={20}
              multiple
              files={files}
              onChange={(newFiles) => {
                console.log(files);
                setFiles(newFiles);
              }}
              isRequired
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
