import {
  Heading,
  Button,
  Flex,
  View,
  Text,
  Alert,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

export function PreLimResults() {
  const navigate = useNavigate();
  const [habitat] = useOutletContext();
  const preLimAnswers = useSelector((state) => state.preLimAnswers);
  function alerts(preLim, habitatObject) {
    const alertArray = [];

    for (let index = 0; index < preLim.preLimAnswers.length; index += 1) {
      if (
        preLim.preLimAnswers[index] ===
        habitatObject.props.prePreScreen.prePreScreenQuestions[index]
          .rejectionValue
      ) {
        const alert = (
          <Alert
            variation="error"
            isDismissible={false}
            hasIcon
            key={index}
            marginBottom="20px"
          >
            {
              habitatObject.props.prePreScreen.prePreScreenQuestions[index]
                .rejectionResultText
            }
          </Alert>
        );
        alertArray.push(alert);
      }
    }
    return alertArray;
  }

  const alertList = alerts(preLimAnswers, habitat);

  const congratulations = (
    <Flex direction="column">
      <Heading level="3" textAlign="start">
        Congratulations!
      </Heading>
      <Text textAlign="start">
        {habitat?.props?.prePreScreen?.prePreScreenResultsText.Congratulations}
      </Text>
      <Button
        variation="primary"
        width="fit-content"
        onClick={() => navigate('../../form/')}
      >
        Sign Up
      </Button>
    </Flex>
  );

  const sorry = (
    <Flex direction="column">
      <Heading level="3" textAlign="start">
        Sorry
      </Heading>
      <Text textAlign="start">
        {habitat?.props?.prePreScreen?.prePreScreenResultsText.Sorry}
      </Text>
      {alertList.map((alert) => alert)}
    </Flex>
  );

  return (
    <View as="div">{alertList.length === 0 ? congratulations : sorry}</View>
  );
}
