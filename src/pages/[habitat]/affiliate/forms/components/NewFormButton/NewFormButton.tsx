/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from 'components/CustomButton/CustomButton';
import { MdAdd } from 'react-icons/md';
import Modal from 'components/Modal';
import {
  Text,
  View,
  Flex,
  TextField,
  TextAreaField,
  Loader,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import FileInput from 'components/FileInput';
import { DataStore } from '@aws-amplify/datastore';
import { Habitat, RootForm, RootFormStatusTypes } from 'models';
import { useOutletContext } from 'react-router-dom';
import { Storage } from 'aws-amplify';

interface IProperties {
  triggerUpdate: () => void;
}

function NewFormButton({ triggerUpdate }: IProperties) {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  // Get context
  interface OutletContextType {
    habitat: Habitat;
  }

  const context = useOutletContext<OutletContextType>();
  const { habitat } = context;

  // onChange
  const handleOnChange = (newFiles: any) => {
    setFiles(newFiles);
  };

  // file uploader
  const uploadFiles = async (upFiles: [File], rootForm: RootForm) => {
    const promisesArr = upFiles.map((file) =>
      Storage.put(
        `rootForms/${habitat?.urlName}/${rootForm?.id}/${file.name}`,
        file,
        {
          level: 'public',
        }
      )
    );

    const results = await Promise.all(promisesArr);

    return results;
  };

  // Submit handler
  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());
    try {
      // Create new RootForm record
      const newForm = await DataStore.save(
        new RootForm({
          name: formDataObject.name as string,
          status: RootFormStatusTypes.PENDING,
          description: formDataObject.description as string,
          habitatID: habitat.id,
        })
      );

      // File upload
      const newFiles = files as unknown as [File];
      const fileArray = await uploadFiles(newFiles, newForm);
      const valuesArray = fileArray.map((obj) => Object.values(obj)[0]);

      setFiles([]);

      // Update RootForm record
      await DataStore.save(
        RootForm.copyOf(newForm, (item) => {
          item.files = valuesArray;
        })
      );
      triggerUpdate();
    } catch (error) {
      console.log(`Error creating new form: ${error}`);
    }

    setLoading(false);
    setModalOpen(!modalOpen);
    event.target.reset();
  }

  const newFormModal = (
    <Modal
      title="Create a new form 📝"
      open={modalOpen}
      onClickClose={() => {
        setModalOpen(!modalOpen);
      }}
      width={isMobile ? '90%' : '60%'}
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
            <FileInput
              label="Please upload your paper application"
              onChange={handleOnChange}
              isRequired
              multiple
              accept="image/*, .pdf"
              maxFileCount={20}
              files={files}
            />
            <Flex direction="row" justifyContent="end">
              <CustomButton disabled={loading} type="submit">
                Submit
              </CustomButton>
            </Flex>
          </Flex>
        </form>
        {loading && (
          <View>
            <Text>Uploading files</Text>
            <Loader variation="linear" />
          </View>
        )}
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
