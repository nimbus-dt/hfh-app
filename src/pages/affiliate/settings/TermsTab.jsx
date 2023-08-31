import PropTypes from 'prop-types';
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
import ErrorText from '../../../components/Forms/ErrorText';
import { valueAsStringOrEmpty } from '../../../utils/forms';

export const DEFAULT_TERM_VALUES = {
  title: '',
  body: '',
};

const FIELD_PATH = 'prePreScreen.prePreScreenTerms';

export function TermsTab({ watch, control, register, errors }) {
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
        Terms and Services
      </Heading>

      <Flex direction="column" marginBottom="1rem" marginTop="1rem">
        {controlledFields.map((field, index) => (
          <div key={field.id}>
            <Text marginBottom="0.5rem">Term #{index + 1}</Text>

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
                      errors?.prePreScreen?.prePreScreenTerms?.[index]?.title
                        ?.message
                    }
                  />
                </View>

                <View>
                  <TextAreaField
                    placeholder="Body"
                    rows={3}
                    resize="vertical"
                    {...register(`${FIELD_PATH}.${index}.body`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenTerms?.[index]?.body
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
        onClick={() => append(DEFAULT_TERM_VALUES)}
      >
        Append Term
      </Button>
    </>
  );
}

TermsTab.propTypes = {
  watch: PropTypes.func,
  control: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
};
