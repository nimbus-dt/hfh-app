import PropTypes from 'prop-types';
import { Controller, useFieldArray } from 'react-hook-form';
import {
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroupField,
  Text,
  TextAreaField,
  TextField,
  View,
} from '@aws-amplify/ui-react';
import { HiTrash } from 'react-icons/hi';
import { valueAsStringOrEmpty } from '../../../utils/forms';
import ErrorText from '../../../components/Forms/ErrorText';

export const DEFAULT_QUESTION_VALUES = {
  name: '',
  description: '',
  label: '',
  rejectionValue: 'Yes',
  rejectionResultText: '',
};

const FIELD_PATH = 'prePreScreen.prePreScreenQuestions';

export function QuestionsTab({ watch, control, register, errors }) {
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
        Preliminary Form Questions
      </Heading>

      <Flex direction="column" marginBottom="1rem" marginTop="1rem">
        {controlledFields.map((field, index) => (
          <div key={field.id}>
            <Text marginBottom="0.5rem">Question #{index + 1}</Text>
            <Flex direction="row" width="100%" alignContent="center">
              <Flex
                direction="column"
                width="100%"
                alignContent="center"
                gap="0.5rem"
              >
                <View>
                  <TextField
                    placeholder="Name"
                    {...register(`${FIELD_PATH}.${index}.name`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    isRequired
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenQuestions?.[index]?.name
                        ?.message
                    }
                  />
                </View>

                <View>
                  <TextField
                    placeholder="Label"
                    {...register(`${FIELD_PATH}.${index}.label`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    isRequired
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenQuestions?.[index]
                        ?.label?.message
                    }
                  />
                </View>

                <View>
                  <TextAreaField
                    placeholder="Description"
                    rows={3}
                    {...register(`${FIELD_PATH}.${index}.description`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenQuestions?.[index]
                        ?.description?.message
                    }
                  />
                </View>

                <Controller
                  control={control}
                  name={`${FIELD_PATH}.${index}.rejectionValue`}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <RadioGroupField
                        name={`${FIELD_PATH}.${index}.rejectionValue`}
                        label="Rejection Value:"
                        direction="row"
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        value={value}
                        isRequired
                      >
                        <Radio value="Yes">Yes</Radio>
                        <Radio value="No">No</Radio>
                      </RadioGroupField>
                      <ErrorText
                        message={
                          errors?.prePreScreen?.prePreScreenQuestions?.[index]
                            ?.rejectionValue?.message
                        }
                      />
                    </View>
                  )}
                />

                <View>
                  <TextField
                    placeholder="Rejection Result Text"
                    {...register(`${FIELD_PATH}.${index}.rejectionResultText`, {
                      setValueAs: valueAsStringOrEmpty,
                    })}
                    isRequired
                    labelHidden
                  />
                  <ErrorText
                    message={
                      errors?.prePreScreen?.prePreScreenQuestions?.[index]
                        ?.rejectionResultText?.message
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
        onClick={() => append(DEFAULT_QUESTION_VALUES)}
      >
        Append Question
      </Button>
    </>
  );
}

QuestionsTab.propTypes = {
  watch: PropTypes.func,
  control: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
};
