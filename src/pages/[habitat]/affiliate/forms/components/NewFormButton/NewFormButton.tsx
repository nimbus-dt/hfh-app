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
import { RootForm, RootFormStatusTypes } from 'models';
import { API, Storage } from 'aws-amplify';
import useHabitat from 'hooks/utils/useHabitat';

const EMAIL_S3_BUCKET = process.env.REACT_APP_EMAIL_S3_BUCKET;

interface IProperties {
  triggerUpdate: () => void;
}

function NewFormButton({ triggerUpdate }: IProperties) {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidFiles, setInvalidFiles] = useState(false);
  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  // Get context

  const { habitat } = useHabitat();

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

    if (!habitat) {
      return;
    }

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
          formUrls: [],
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

      await API.post('public', '/email-admin', {
        body: {
          subject: `Action Required: Set Up New Form for ${habitat?.name} habitat`,
          body: `
            <div>
              <p>A new form needs to be set up for ${habitat?.longName}</p>
              <ul>
                <li>Name: ${newForm?.name}</li>
                <li>Description: ${newForm?.description}</li>
                ${valuesArray?.map(
                  (file, index) =>
                    `<li>File ${index + 1}: ${EMAIL_S3_BUCKET}${file}</li>`
                )}
              </ul>
            </div>
          `,
        },
      });

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
              onInvalid={() => setInvalidName(true)}
              errorMessage="Please enter a name for your form."
              hasError={invalidName}
              onBlur={() => setInvalidName(false)}
            />
            <TextAreaField
              name="description"
              label="Can you describe your form in a couple of words?"
              placeholder="The form is an application that determines if a family is fit to participate in Habitat for Humanity's Homeownership Program. These are received twice a year and reviewed by Habitat workers."
              required
              onInvalid={() => setInvalidDescription(true)}
              errorMessage="Please enter a description for your form."
              hasError={invalidDescription}
              onBlur={() => setInvalidDescription(false)}
            />
            <FileInput
              label="Please upload your paper application"
              onChange={handleOnChange}
              isRequired
              multiple
              accept="image/*, .pdf"
              maxFileCount={20}
              files={files}
              onInvalid={() => setInvalidFiles(true)}
              errorMessage="Please upload at least one file."
              hasError={invalidFiles}
              onBlur={() => setInvalidFiles(false)}
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
