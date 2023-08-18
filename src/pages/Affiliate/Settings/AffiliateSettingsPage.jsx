import PropTypes from 'prop-types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Flex,
  Heading,
  Card,
  Tabs,
  TabItem,
  Button,
  Alert,
} from '@aws-amplify/ui-react';
import { DEFAULT_QUESTION_VALUES, QuestionsTab } from './QuestionsTab';
import { DEFAULT_TERM_VALUES, TermsTab } from './TermsTab';
import { habitatPropsFormSchema } from './form.schema';
import { isObjectEmpty } from '../../../utils/objects';
import { PREPRESCREEN_HOMETEXT_DEFAULT } from './PreScreenHomeTextList';
import { PRESCREEN_HOMETEXT_DEFAULT } from './PrePreScreenHomeTextList';
import { GeneralTab } from './GeneralTab';

const DEFAULT_VALUES = {
  data: {
    maxCoapplicants: '',
  },
  preScreen: {
    homeText: [PRESCREEN_HOMETEXT_DEFAULT],
  },
  prePreScreen: {
    prePreScreenTerms: [DEFAULT_TERM_VALUES],
    prePreScreenQuestions: [DEFAULT_QUESTION_VALUES],
    prePreScreenResultsText: {
      Sorry: '',
      Congratulations: '',
    },
    prePreScreenHomeText: [PREPRESCREEN_HOMETEXT_DEFAULT],
    prePreScreenStatusPage: {
      ACCEPTED: '',
      PENDING: '',
      REJECTED: '',
    },
  },
};

export function AffiliateSettingsPage({ habitatProps }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(habitatPropsFormSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
    values: habitatProps,
  });

  const onValid = (data) => {
    // TODO implement form submition
    console.log(JSON.stringify(data, null, 2));
  };

  const onInvalid = (validationErrors) => {
    // TODO remove
    console.log(validationErrors);
  };

  return (
    <Card
      variation="elevated"
      width={{ base: '95%', medium: '80%', large: '60%' }}
      minHeight="100%"
      margin="auto"
      marginTop="1rem"
      marginBottom="1rem"
      wrap
    >
      <Flex direction="column" width="100%" alignContent="center">
        <Heading level={3} fontWeight="bold" textAlign="center">
          Settings
        </Heading>

        <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
          {!isObjectEmpty(errors) && (
            <Alert
              key={alert.key}
              variation="error"
              isDismissible={false}
              marginBottom="20px"
              hasIcon
            >
              Error: Please check the entered data
            </Alert>
          )}

          <Tabs spacing="equal">
            <TabItem title="General" onClick={(...args) => console.log(args)}>
              <GeneralTab
                watch={watch}
                register={register}
                control={control}
                errors={errors}
              />
            </TabItem>

            <TabItem title="Terms">
              <TermsTab
                watch={watch}
                register={register}
                control={control}
                errors={errors}
              />
            </TabItem>

            <TabItem title="Questions">
              <QuestionsTab
                watch={watch}
                register={register}
                control={control}
                errors={errors}
              />
            </TabItem>
          </Tabs>

          <Flex direction="row-reverse" alignItems="center" marginTop="2rem">
            <Button type="submit" variation="primary">
              Save Settings
            </Button>
            <Button type="button" variation="warning" onClick={() => reset()}>
              Cancel
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
}

const habitatPropsShape = PropTypes.shape({
  data: PropTypes.shape({
    maxCoapplicants: PropTypes.number,
  }),
  preScreen: PropTypes.shape({
    homeText: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
  prePreScreen: PropTypes.shape({
    prePreScreenTerms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
      })
    ),
    prePreScreenQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        label: PropTypes.string,
        rejectionValue: PropTypes.oneOf(['Yes', 'No']),
        rejectionResultText: PropTypes.string,
      })
    ),
    prePreScreenResultsText: PropTypes.shape({
      Sorry: PropTypes.string,
      Congratulations: PropTypes.string,
    }),
    prePreScreenHomeText: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    prePreScreenStatusPage: PropTypes.shape({
      ACCEPTED: PropTypes.string,
      PENDING: PropTypes.string,
      REJECTED: PropTypes.string,
    }),
  }),
});

AffiliateSettingsPage.propTypes = {
  habitatProps: habitatPropsShape,
};
