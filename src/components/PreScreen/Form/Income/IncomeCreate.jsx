/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import {
  Card,
  Heading,
  TextField,
  SelectField,
  Flex,
  Button,
  Text,
  View,
  Alert,
} from '@aws-amplify/ui-react';
import { HiTrash } from 'react-icons/hi';
import { DataStore, Storage } from 'aws-amplify';
import { IncomeTypes, IncomeRecord } from '../../../../models';

const MAX_FILES_AMOUNT = 10;

export function IncomeCreate({ owners, habitat, application }) {
  const [files, setFiles] = useState([]);
  const [filesInputError, setFilesInputError] = useState(false);
  const filesInputRef = useRef();

  const getFileFormattedKey = (fileName, ownerValue) => {
    const formattedKey = `${
      habitat?.urlName
    }_${ownerValue}_${Date.now()}_${fileName}`;

    return formattedKey;
  };

  const uploadFiles = async (ownerValue) => {
    const promisesArr = files.map((file) =>
      Storage.put(getFileFormattedKey(file.name, ownerValue), file, {
        level: 'protected',
      })
    );

    const results = await Promise.all(promisesArr);

    return results;
  };

  // Create new income record
  const handleCreate = async (e) => {
    e.preventDefault();

    // Access the form fields
    const formFields = e.target.elements;

    try {
      const results = await uploadFiles(formFields.owner.value);

      // Get data from form
      const data = {
        ownerID: formFields.owner.value,
        typeOfIncome: formFields.type.value,
        employer: formFields.employer.value,
        employmentTime: Number(
          Number(formFields.employmentTime.value).toFixed(2)
        ),
        estimatedMonthlyIncome: Number(
          Number(formFields.estimatedMonthlyIncome.value).toFixed(2)
        ),
        proofOfIncome: results.map((result) => result?.key),
        applicationID: application?.id,
      };

      // Create income record
      await DataStore.save(new IncomeRecord(data));

      // Reset the form
      e.target.reset();
      window.location.reload();
    } catch (error) {
      console.log(`Error uploading files: ${error}`);
    }
  };

  // this function is used to keep the input data in sync with the state
  const updateFilesList = (filesList) => {
    filesInputRef.current.files = filesList;
    setFiles(Array.from(filesList));
  };

  const handleFilesInputChange = (e) => {
    const filesList = e.target.files;

    if (filesList.length > MAX_FILES_AMOUNT) {
      const emptyFiles = new DataTransfer().files;

      updateFilesList(emptyFiles);
      setFilesInputError(true);

      return;
    }

    setFilesInputError(false);
    setFiles(Array.from(filesList));
  };

  const handleOnFileRemove = (fileName) => {
    const dt = new DataTransfer();

    files.forEach((file) => {
      if (file.name === fileName) {
        return;
      }

      dt.items.add(file);
    });

    updateFilesList(dt.files);
  };

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Income Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns this income record?">
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name}`}
              </option>
            ))}
          </SelectField>
          <SelectField
            name="type"
            label="Type of income"
            isRequired
            placeholder="Select an option"
          >
            <option value={IncomeTypes.SALARIED_EMPLOYMENT}>
              Salaried Employment
            </option>
            <option value={IncomeTypes.HOURLY_EMPLOYMENT}>
              Hourly Employment
            </option>
            <option value={IncomeTypes.SELF_EMPLOYMENT}>Self Employment</option>
            <option value={IncomeTypes.SOCIAL_SECURITY_DISABILITY_INSURANCE}>
              Social Security Disability Insurance
            </option>
            <option value={IncomeTypes.SOCIAL_SECURITY_BENEFITS}>
              Social Security Benefits
            </option>
            <option value={IncomeTypes.SUPPLEMENTAL_SECURITY_INCOME}>
              Supplemental Security Income
            </option>
            <option value={IncomeTypes.HOUSING_VOUCHER}>Housing Voucher</option>
            <option value={IncomeTypes.CHILD_SUPPORT}>Child Support</option>
            <option value={IncomeTypes.ALIMONY_SUPPORT}>Alimony Support</option>
            <option value={IncomeTypes.VETERANS_AFFAIR_COMPENSATION}>
              Veterans Affairs Compensation
            </option>
            <option value={IncomeTypes.PENSION_PAYMENTS}>
              Pension Payments
            </option>
            <option value={IncomeTypes.MILITARY_ENTITLEMENTS}>
              Military Entitlements
            </option>
            <option value={IncomeTypes.OTHER}>Other</option>
          </SelectField>
          <TextField
            name="employer"
            label="Name of employer"
            placeholder="U.S Government"
            isRequired
          />
          <TextField
            name="employmentTime"
            label="How many months have you been employed in this job?"
            placeholder="12"
            isRequired
            type="number"
            min={0}
          />
          <TextField
            min={0}
            step={0.01}
            name="estimatedMonthlyIncome"
            label="Estimated monthly income"
            placeholder="$1000.50"
            isRequired
            type="number"
          />

          <View width="100%">
            <TextField
              label="Upload most recent pay stub"
              name="proofOfIncome"
              type="file"
              accept=".jpg, .png, .pdf"
              onChange={handleFilesInputChange}
              ref={filesInputRef}
              multiple
              isRequired
            />

            {filesInputError && (
              <Alert
                key="files-input-amount-error"
                variation="error"
                marginTop="0.5rem"
                onDismiss={() => setFilesInputError(false)}
                isDismissible
                hasIcon
              >
                Maximum amount of files is {MAX_FILES_AMOUNT}
              </Alert>
            )}

            {files.length > 0 && (
              <>
                <Text
                  fontSize="0.875rem"
                  fontStyle="italic"
                  marginTop="0.5rem"
                  variation="secondary"
                >
                  Selected files:
                </Text>

                <Flex
                  direction="column"
                  gap="0.25rem"
                  maxHeight="12.5rem"
                  overflow="auto"
                >
                  {files.map((file) => (
                    <Flex
                      key={file.name}
                      height="3rem"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.25rem"
                    >
                      <TextField
                        value={file.name}
                        type="text"
                        margin="0rem"
                        grow={1}
                        style={{
                          cursor: 'auto',
                        }}
                        disabled
                        labelHidden
                      />
                      <Button
                        title="Remove file"
                        type="button"
                        variation="destructive"
                        height="2.5rem"
                        width="2.5rem"
                        padding="0rem"
                        margin="0rem"
                        onClick={() => handleOnFileRemove(file.name)}
                      >
                        <HiTrash size={16} />
                      </Button>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
          </View>

          <Button type="submit" variation="primary">
            Add
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
