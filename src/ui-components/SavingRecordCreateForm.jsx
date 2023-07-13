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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SavingRecord } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SavingRecordCreateForm(props) {
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
    institution: "",
    estimatedAmount: "",
    ownerApplicant: false,
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [institution, setInstitution] = React.useState(
    initialValues.institution
  );
  const [estimatedAmount, setEstimatedAmount] = React.useState(
    initialValues.estimatedAmount
  );
  const [ownerApplicant, setOwnerApplicant] = React.useState(
    initialValues.ownerApplicant
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwnerID(initialValues.ownerID);
    setInstitution(initialValues.institution);
    setEstimatedAmount(initialValues.estimatedAmount);
    setOwnerApplicant(initialValues.ownerApplicant);
    setErrors({});
  };
  const validations = {
    ownerID: [],
    institution: [],
    estimatedAmount: [],
    ownerApplicant: [],
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
          institution,
          estimatedAmount,
          ownerApplicant,
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new SavingRecord(modelFields));
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
      {...getOverrideProps(overrides, "SavingRecordCreateForm")}
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
              institution,
              estimatedAmount,
              ownerApplicant,
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
      <TextField
        label="Institution"
        isRequired={false}
        isReadOnly={false}
        value={institution}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              institution: value,
              estimatedAmount,
              ownerApplicant,
            };
            const result = onChange(modelFields);
            value = result?.institution ?? value;
          }
          if (errors.institution?.hasError) {
            runValidationTasks("institution", value);
          }
          setInstitution(value);
        }}
        onBlur={() => runValidationTasks("institution", institution)}
        errorMessage={errors.institution?.errorMessage}
        hasError={errors.institution?.hasError}
        {...getOverrideProps(overrides, "institution")}
      ></TextField>
      <TextField
        label="Estimated amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedAmount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerID,
              institution,
              estimatedAmount: value,
              ownerApplicant,
            };
            const result = onChange(modelFields);
            value = result?.estimatedAmount ?? value;
          }
          if (errors.estimatedAmount?.hasError) {
            runValidationTasks("estimatedAmount", value);
          }
          setEstimatedAmount(value);
        }}
        onBlur={() => runValidationTasks("estimatedAmount", estimatedAmount)}
        errorMessage={errors.estimatedAmount?.errorMessage}
        hasError={errors.estimatedAmount?.hasError}
        {...getOverrideProps(overrides, "estimatedAmount")}
      ></TextField>
      <SwitchField
        label="Owner applicant"
        defaultChecked={false}
        isDisabled={false}
        isChecked={ownerApplicant}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              ownerID,
              institution,
              estimatedAmount,
              ownerApplicant: value,
            };
            const result = onChange(modelFields);
            value = result?.ownerApplicant ?? value;
          }
          if (errors.ownerApplicant?.hasError) {
            runValidationTasks("ownerApplicant", value);
          }
          setOwnerApplicant(value);
        }}
        onBlur={() => runValidationTasks("ownerApplicant", ownerApplicant)}
        errorMessage={errors.ownerApplicant?.errorMessage}
        hasError={errors.ownerApplicant?.hasError}
        {...getOverrideProps(overrides, "ownerApplicant")}
      ></SwitchField>
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
