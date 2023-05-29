import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import { setPreLimAnswers } from '../../../redux/preLimAnswersSlice.js';

export function PreLimQuestions() {
  const [counter, setCounter] = useState(1);
  const [answers, setAnswers] = useState([]);
  const preLimAnswers = useSelector((state) => state.preLimAnswers);
  const dispatch = useDispatch();

  const [habitat] = useOutletContext();
  const navigate = useNavigate();

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const selectedValue = form.elements.answer.value;

    const newAnswers = [...answers];
    newAnswers[counter - 1] = selectedValue;
    setAnswers(newAnswers);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const nextCounter = counter + 1;
    if (
      counter === habitat?.props?.prePreScreen?.prePreScreenQuestions.length
    ) {
      dispatch(setPreLimAnswers(answers));
      navigate('../results');
    } else {
      setCounter(nextCounter);
    }
  };

  const renderQuestion = () => {
    const currentQuestion =
      habitat?.props?.prePreScreen?.prePreScreenQuestions[counter - 1];

    return (
      <View as="div">
        <Text padding="0" marginBottom="10px">
          {currentQuestion.label}
        </Text>
        <RadioGroupField name="answer" isRequired defaultChecked={false}>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </RadioGroupField>
      </View>
    );
  };

  const isLastQuestion =
    // eslint-disable-next-line no-unsafe-optional-chaining
    counter === habitat?.props?.prePreScreen?.prePreScreenQuestions.length;

  const percentage = Math.round(
    ((counter - 1) /
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
          {isLastQuestion ? 'Submit' : 'Next'}
        </Button>
      </Flex>
    </form>
  );
}
