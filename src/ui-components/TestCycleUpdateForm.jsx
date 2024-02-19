/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { TestCycle } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TestCycleUpdateForm(props) {
  const {
    id: idProp,
    testCycle: testCycleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    startDate: "",
    endDate: "",
    isOpen: false,
    props: "",
  };
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [isOpen, setIsOpen] = React.useState(initialValues.isOpen);
  const [props, setProps] = React.useState(initialValues.props);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = testCycleRecord
      ? { ...initialValues, ...testCycleRecord }
      : initialValues;
    setStartDate(cleanValues.startDate);
    setEndDate(cleanValues.endDate);
    setIsOpen(cleanValues.isOpen);
    setProps(
      typeof cleanValues.props === "string" || cleanValues.props === null
        ? cleanValues.props
        : JSON.stringify(cleanValues.props)
    );
    setErrors({});
  };
  const [testCycleRecord, setTestCycleRecord] =
    React.useState(testCycleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(TestCycle, idProp)
        : testCycleModelProp;
      setTestCycleRecord(record);
    };
    queryData();
  }, [idProp, testCycleModelProp]);
  React.useEffect(resetStateValues, [testCycleRecord]);
  const validations = {
    startDate: [{ type: "Required" }],
    endDate: [],
    isOpen: [{ type: "Required" }],
    props: [{ type: "JSON" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          startDate,
          endDate,
          isOpen,
          props,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            TestCycle.copyOf(testCycleRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TestCycleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Start date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              startDate: value,
              endDate,
              isOpen,
              props,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              startDate,
              endDate: value,
              isOpen,
              props,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <SwitchField
        label="Is open"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isOpen}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              startDate,
              endDate,
              isOpen: value,
              props,
            };
            const result = onChange(modelFields);
            value = result?.isOpen ?? value;
          }
          if (errors.isOpen?.hasError) {
            runValidationTasks("isOpen", value);
          }
          setIsOpen(value);
        }}
        onBlur={() => runValidationTasks("isOpen", isOpen)}
        errorMessage={errors.isOpen?.errorMessage}
        hasError={errors.isOpen?.hasError}
        {...getOverrideProps(overrides, "isOpen")}
      ></SwitchField>
      <TextAreaField
        label="Props"
        isRequired={false}
        isReadOnly={false}
        value={props}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              startDate,
              endDate,
              isOpen,
              props: value,
            };
            const result = onChange(modelFields);
            value = result?.props ?? value;
          }
          if (errors.props?.hasError) {
            runValidationTasks("props", value);
          }
          setProps(value);
        }}
        onBlur={() => runValidationTasks("props", props)}
        errorMessage={errors.props?.errorMessage}
        hasError={errors.props?.hasError}
        {...getOverrideProps(overrides, "props")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || testCycleModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || testCycleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
