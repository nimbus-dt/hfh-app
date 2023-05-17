import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  RadioGroupField,
  Radio,
  Button,
  Flex,
  Text,
  View,
  Card,
  Loader,
} from '@aws-amplify/ui-react';

export function PreLimQuestions() {
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [habitat] = useOutletContext();

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const selectedValue = form.elements.answer.value;

    const newAnswers = [...answers];
    newAnswers[counter] = selectedValue;
    setAnswers(newAnswers);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setCounter(counter + 1);
  };

  const renderQuestion = () => {
    const currentQuestion =
      habitat?.props?.prePreScreen?.prePreScreenQuestions[counter];

    return (
      <View as="div">
        <Text padding="0" marginBottom="10px">
          {currentQuestion.label}
        </Text>
        <RadioGroupField name="answer" isRequired>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </RadioGroupField>
      </View>
    );
  };

  const percentage = Math.round(
    (counter /
      (habitat?.props?.prePreScreen?.prePreScreenQuestions.length || 1)) *
      100
  );

  return (
    <form onSubmit={handleAnswerSubmit}>
      <Loader
        variation="linear"
        percentage={percentage}
        isDeterminate
        marginBottom="40px"
      />
      <Card variation="elevated" marginBottom="50px">
        <Flex marginBottom="30px" direction="column" gap="s">
          {renderQuestion()}
        </Flex>
      </Card>
      <Flex direction="column" width="fit-content">
        <Button type="submit" variation="primary">
          Next
        </Button>
      </Flex>
    </form>
  );
}
