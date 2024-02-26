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
  TextField,
} from "@aws-amplify/ui-react";
import { Application } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    ownerID: "",
    submitted: false,
    dateSubmitted: "",
    habitatRevisor: "",
    dateRevised: "",
    ownerName: "",
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [submitted, setSubmitted] = React.useState(initialValues.submitted);
  const [dateSubmitted, setDateSubmitted] = React.useState(
    initialValues.dateSubmitted
  );
  const [habitatRevisor, setHabitatRevisor] = React.useState(
    initialValues.habitatRevisor
  );
  const [dateRevised, setDateRevised] = React.useState(
    initialValues.dateRevised
  );
  const [ownerName, setOwnerName] = React.useState(initialValues.ownerName);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwnerID(initialValues.ownerID);
    setSubmitted(initialValues.submitted);
    setDateSubmitted(initialValues.dateSubmitted);
    setHabitatRevisor(initialValues.habitatRevisor);
    setDateRevised(initialValues.dateRevised);
    setOwnerName(initialValues.ownerName);
    setErrors({});
  };
  const validations = {
    ownerID: [],
    submitted: [],
    dateSubmitted: [],
    habitatRevisor: [],
    dateRevised: [],
    ownerName: [],
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
          ownerID,
          submitted,
          dateSubmitted,
          habitatRevisor,
          dateRevised,
          ownerName,
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
          await DataStore.save(new Application(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationCreateForm")}
      {...rest}
    >
      <TextField
        label="Owner id"
        isRequired={false}
        isReadOnly={false}
        value={ownerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID: value,
              submitted,
              dateSubmitted,
              habitatRevisor,
              dateRevised,
              ownerName,
            };
            const result = onChange(modelFields);
            value = result?.ownerID ?? value;
          }
          if (errors.ownerID?.hasError) {
            runValidationTasks("ownerID", value);
          }
          setOwnerID(value);
        }}
        onBlur={() => runValidationTasks("ownerID", ownerID)}
        errorMessage={errors.ownerID?.errorMessage}
        hasError={errors.ownerID?.hasError}
        {...getOverrideProps(overrides, "ownerID")}
      ></TextField>
      <SwitchField
        label="Submitted"
        defaultChecked={false}
        isDisabled={false}
        isChecked={submitted}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              ownerID,
              submitted: value,
              dateSubmitted,
              habitatRevisor,
              dateRevised,
              ownerName,
            };
            const result = onChange(modelFields);
            value = result?.submitted ?? value;
          }
          if (errors.submitted?.hasError) {
            runValidationTasks("submitted", value);
          }
          setSubmitted(value);
        }}
        onBlur={() => runValidationTasks("submitted", submitted)}
        errorMessage={errors.submitted?.errorMessage}
        hasError={errors.submitted?.hasError}
        {...getOverrideProps(overrides, "submitted")}
      ></SwitchField>
      <TextField
        label="Date submitted"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateSubmitted}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              submitted,
              dateSubmitted: value,
              habitatRevisor,
              dateRevised,
              ownerName,
            };
            const result = onChange(modelFields);
            value = result?.dateSubmitted ?? value;
          }
          if (errors.dateSubmitted?.hasError) {
            runValidationTasks("dateSubmitted", value);
          }
          setDateSubmitted(value);
        }}
        onBlur={() => runValidationTasks("dateSubmitted", dateSubmitted)}
        errorMessage={errors.dateSubmitted?.errorMessage}
        hasError={errors.dateSubmitted?.hasError}
        {...getOverrideProps(overrides, "dateSubmitted")}
      ></TextField>
      <TextField
        label="Habitat revisor"
        isRequired={false}
        isReadOnly={false}
        value={habitatRevisor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              submitted,
              dateSubmitted,
              habitatRevisor: value,
              dateRevised,
              ownerName,
            };
            const result = onChange(modelFields);
            value = result?.habitatRevisor ?? value;
          }
          if (errors.habitatRevisor?.hasError) {
            runValidationTasks("habitatRevisor", value);
          }
          setHabitatRevisor(value);
        }}
        onBlur={() => runValidationTasks("habitatRevisor", habitatRevisor)}
        errorMessage={errors.habitatRevisor?.errorMessage}
        hasError={errors.habitatRevisor?.hasError}
        {...getOverrideProps(overrides, "habitatRevisor")}
      ></TextField>
      <TextField
        label="Date revised"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateRevised}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              submitted,
              dateSubmitted,
              habitatRevisor,
              dateRevised: value,
              ownerName,
            };
            const result = onChange(modelFields);
            value = result?.dateRevised ?? value;
          }
          if (errors.dateRevised?.hasError) {
            runValidationTasks("dateRevised", value);
          }
          setDateRevised(value);
        }}
        onBlur={() => runValidationTasks("dateRevised", dateRevised)}
        errorMessage={errors.dateRevised?.errorMessage}
        hasError={errors.dateRevised?.hasError}
        {...getOverrideProps(overrides, "dateRevised")}
      ></TextField>
      <TextField
        label="Owner name"
        isRequired={false}
        isReadOnly={false}
        value={ownerName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              submitted,
              dateSubmitted,
              habitatRevisor,
              dateRevised,
              ownerName: value,
            };
            const result = onChange(modelFields);
            value = result?.ownerName ?? value;
          }
          if (errors.ownerName?.hasError) {
            runValidationTasks("ownerName", value);
          }
          setOwnerName(value);
        }}
        onBlur={() => runValidationTasks("ownerName", ownerName)}
        errorMessage={errors.ownerName?.errorMessage}
        hasError={errors.ownerName?.hasError}
        {...getOverrideProps(overrides, "ownerName")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
