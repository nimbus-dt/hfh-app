import PropTypes from 'prop-types';
import { Flex, Heading, TextField, View } from '@aws-amplify/ui-react';
import {
  valueAsNumberOrEmpty,
  valueAsStringOrEmpty,
} from '../../../utils/forms';
import ErrorText from '../../../components/forms/ErrorText';
import { PrePreScreenHomeTextList } from './PrePreScreenHomeTextList';
import { PreScreenHomeTextList } from './PreScreenHomeTextList';

export function GeneralTab({ watch, control, register, errors }) {
  return (
    <>
      <Heading level={5} fontWeight="bold" textAlign="center" marginTop="1rem">
        General Settings
      </Heading>

      <Flex
        direction="column"
        width="100%"
        alignContent="center"
        marginTop="1rem"
        gap="0.5rem"
      >
        <View>
          <TextField
            name="maxCoapplicants"
            label="Max Coapplicants"
            type="number"
            step={1}
            placeholder="0"
            {...register('data.maxCoapplicants', {
              setValueAs: valueAsNumberOrEmpty,
            })}
          />
          <ErrorText message={errors?.data?.maxCoapplicants?.message} />
        </View>

        <Heading
          level={5}
          fontWeight="bold"
          textAlign="center"
          marginTop="1rem"
        >
          Results Text
        </Heading>

        <View>
          <TextField
            label="Sorry Results Text"
            {...register('prePreScreen.prePreScreenResultsText.Sorry', {
              setValueAs: (value) => {
                if (!value) {
                  return undefined;
                }

                return value;
              },
            })}
          />
          <ErrorText
            message={
              errors?.prePreScreen?.prePreScreenResultsText?.Sorry?.message
            }
          />
        </View>

        <View>
          <TextField
            label="Congratulations Results Text"
            {...register(
              'prePreScreen.prePreScreenResultsText.Congratulations',
              {
                setValueAs: (value) => {
                  if (!value) return undefined;

                  return value;
                },
              }
            )}
          />
          <ErrorText
            message={
              errors?.prePreScreen?.prePreScreenResultsText?.Congratulations
                ?.message
            }
          />
        </View>

        <Heading
          level={5}
          fontWeight="bold"
          textAlign="center"
          marginTop="1rem"
        >
          Status Page Message
        </Heading>

        <View>
          <TextField
            name="statusPageAcepted"
            label="Status Page Accepted Message"
            {...register('prePreScreen.prePreScreenStatusPage.ACCEPTED', {
              setValueAs: valueAsStringOrEmpty,
            })}
          />
          <ErrorText
            message={
              errors?.prePreScreen?.prePreScreenStatusPage?.ACCEPTED?.message
            }
          />
        </View>

        <View>
          <TextField
            name="statusPagePending"
            label="Status Page Pending Message"
            {...register('prePreScreen.prePreScreenStatusPage.PENDING', {
              setValueAs: valueAsStringOrEmpty,
            })}
          />
          <ErrorText
            message={
              errors?.prePreScreen?.prePreScreenStatusPage?.PENDING?.message
            }
          />
        </View>

        <View>
          <TextField
            name="statusPageRejected"
            label="Status Page Rejected Message"
            {...register('prePreScreen.prePreScreenStatusPage.REJECTED', {
              setValueAs: valueAsStringOrEmpty,
            })}
          />
          <ErrorText
            message={
              errors?.prePreScreen?.prePreScreenStatusPage?.REJECTED?.message
            }
          />
        </View>
      </Flex>

      <PrePreScreenHomeTextList
        watch={watch}
        register={register}
        control={control}
        errors={errors}
      />

      <PreScreenHomeTextList
        watch={watch}
        register={register}
        control={control}
        errors={errors}
      />
    </>
  );
}

GeneralTab.propTypes = {
  watch: PropTypes.func,
  control: PropTypes.object,
  register: PropTypes.func,
  errors: PropTypes.object,
};
