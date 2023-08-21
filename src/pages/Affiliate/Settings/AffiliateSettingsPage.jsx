import PropTypes from 'prop-types';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';

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
import { PREPRESCREEN_HOMETEXT_DEFAULT } from './PreScreenHomeTextList';
import { PRESCREEN_HOMETEXT_DEFAULT } from './PrePreScreenHomeTextList';
import { GeneralTab } from './GeneralTab';
import { Habitat } from '../../../models';

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

const FORM_ERROR_ALERT = {
  key: 'habitat-props-form-error-alert',
  variation: 'error',
  message: 'Please check the entered data',
};

const NETWORK_ERROR_ALERT = {
  key: 'habitat-props-network-error-alert',
  variation: 'error',
  message: 'An error has ocurred, try again',
};

const SUCCESS_ALERT = {
  key: 'habitat-props-form-success-alert',
  variation: 'success',
  message: 'Settings updated successfully',
};

export function AffiliateSettingsPage({ habitatId, habitatProps }) {
  const [alert, setAlert] = useState(null);
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

  const updateAlert = (newAlert) => {
    setAlert(newAlert);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onValid = async (data) => {
    try {
      const originalHabitat = await DataStore.query(Habitat, habitatId);
      await DataStore.save(
        Habitat.copyOf(originalHabitat, (updated) => {
          updated.props = data;
        })
      );

      updateAlert(SUCCESS_ALERT);
    } catch (error) {
      updateAlert(NETWORK_ERROR_ALERT);
    }
  };

  const onInvalid = () => {
    updateAlert(FORM_ERROR_ALERT);
  };

  return (
    <>
      <Heading level={3} fontWeight="bold" textAlign="center">
        Settings
      </Heading>

      <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        {alert && (
          <Alert
            key={alert.key}
            variation={alert.variation}
            marginBottom="20px"
            isDismissible
            hasIcon
            onDismiss={() => updateAlert(null)}
          >
            {alert.message}
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
    </>
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
  habitatId: PropTypes.string,
  habitatProps: habitatPropsShape,
};
