import {
  Heading,
  Button,
  Flex,
  View,
  Text,
  Alert,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function PreLimResults() {
  const navigate = useNavigate();
  const [habitat] = useOutletContext();
  const preLimAnswers = useSelector((state) => state.preLimAnswers);
  const [alerts, setAlerts] = useState([]);

  function persistAlerts(alertArray) {
    localStorage.setItem('prelimAlerts', JSON.stringify(alertArray));
  }

  function loadPersistedAlerts() {
    const persistedAlerts = localStorage.getItem('prelimAlerts');
    return persistedAlerts ? JSON.parse(persistedAlerts) : [];
  }

  function generateAlerts(preLim, habitatObject) {
    const alertArray = [];

    for (let index = 0; index < preLim.preLimAnswers.length; index += 1) {
      if (
        preLim.preLimAnswers[index] ===
        habitatObject.props.prePreScreen.prePreScreenQuestions[index]
          .rejectionValue
      ) {
        const alert = {
          text: habitatObject.props.prePreScreen.prePreScreenQuestions[index]
            .rejectionResultText,
          key: index,
        };
        alertArray.push(alert);
      }
    }
    return alertArray;
  }

  useEffect(() => {
    const persistedAlerts = loadPersistedAlerts();

    if (persistedAlerts.length > 0) {
      setAlerts(persistedAlerts);
    } else {
      const newAlerts = generateAlerts(preLimAnswers, habitat);
      setAlerts(newAlerts);
      persistAlerts(newAlerts);
    }
  }, [preLimAnswers, habitat]);

  const prePreScreenResultsText =
    habitat?.props?.prePreScreen?.prePreScreenResultsText;

  const congratulations = (
    <Flex direction="column">
      <Heading level="3" textAlign="start">
        Congratulations!
      </Heading>
      <Text textAlign="start">{prePreScreenResultsText?.Congratulations}</Text>
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
      <Text textAlign="start">{prePreScreenResultsText?.Sorry}</Text>
      {alerts.map((alert) => (
        <Alert
          key={alert.key}
          variation="error"
          isDismissible={false}
          hasIcon
          marginBottom="20px"
        >
          {alert.text}
        </Alert>
      ))}
    </Flex>
  );

  return <View as="div">{alerts.length === 0 ? congratulations : sorry}</View>;
}
