/* eslint-disable react/prop-types */
import { useFieldArray } from 'react-hook-form';
import {
  Button,
  Flex,
  Heading,
  Text,
  TextAreaField,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { HiTrash } from 'react-icons/hi';
import { valueAsStringOrEmpty } from '../../../utils/forms';
import ErrorText from '../../../components/Forms/ErrorText';

export const PRESCREEN_HOMETEXT_DEFAULT = {
  title: '',
  text: '',
};

const FIELD_PATH = 'prePreScreen.prePreScreenHomeText';

export function PrePreScreenHomeTextList({ watch, control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_PATH,
  });

  const watchFields = watch(FIELD_PATH);
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFields[index],
  }));

  return (
    <>
      <Heading level={5} fontWeight="bold" textAlign="center" marginTop="1rem">
        Preliminary Form Home Text
      </Heading>

      <Flex direction="column" marginBottom="1rem" marginTop="1rem">
        {controlledFields.map((field, index) => (
          <div key={field.id}>
            <Text marginBottom="0.5rem">Text #{index + 1}</Text>
            <Flex direction="row" width="100%" alignContent="center">
              <Flex
                direction="column"
                width="100%"
                alignContent="center"
                gap="0.5rem"
              >
                <View>
                  <TextField
                    placeholder="Title"
                    {...register(`${FIELD_PATH}.${index}.title`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    isRequired
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenHomeText?.[index]?.title
                        ?.message
                    }
                  />
                </View>

                <View>
                  <TextAreaField
                    placeholder="Text"
                    rows={3}
                    {...register(`${FIELD_PATH}.${index}.text`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenHomeText?.[index]?.text
                        ?.message
                    }
                  />
                </View>
              </Flex>

              <div>
                <Button
                  title="Delete element"
                  type="button"
                  variation="destructive"
                  onClick={() => remove(index)}
                  disabled={controlledFields.length <= 1}
                >
                  <HiTrash />
                </Button>
              </div>
            </Flex>
          </div>
        ))}
      </Flex>
      <Button
        type="button"
        variation="primary"
        onClick={() => append(PRESCREEN_HOMETEXT_DEFAULT)}
      >
        Append Text
      </Button>
    </>
  );
}

// QuestionsForm.propTypes = {
//   handleOnSubmit: PropTypes.func,
// };
