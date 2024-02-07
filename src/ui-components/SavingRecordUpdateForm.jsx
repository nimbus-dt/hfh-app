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
import { SavingRecord } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SavingRecordUpdateForm(props) {
  const {
    id: idProp,
    savingRecord: savingRecordModelProp,
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
    applicationID: "",
    ownerApplicant: false,
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [institution, setInstitution] = React.useState(
    initialValues.institution
  );
  const [estimatedAmount, setEstimatedAmount] = React.useState(
    initialValues.estimatedAmount
  );
  const [applicationID, setApplicationID] = React.useState(
    initialValues.applicationID
  );
  const [ownerApplicant, setOwnerApplicant] = React.useState(
    initialValues.ownerApplicant
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = savingRecordRecord
      ? { ...initialValues, ...savingRecordRecord }
      : initialValues;
    setOwnerID(cleanValues.ownerID);
    setInstitution(cleanValues.institution);
    setEstimatedAmount(cleanValues.estimatedAmount);
    setApplicationID(cleanValues.applicationID);
    setOwnerApplicant(cleanValues.ownerApplicant);
    setErrors({});
  };
  const [savingRecordRecord, setSavingRecordRecord] = React.useState(
    savingRecordModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(SavingRecord, idProp)
        : savingRecordModelProp;
      setSavingRecordRecord(record);
    };
    queryData();
  }, [idProp, savingRecordModelProp]);
  React.useEffect(resetStateValues, [savingRecordRecord]);
  const validations = {
    ownerID: [],
    institution: [],
    estimatedAmount: [],
    applicationID: [],
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
          applicationID,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            SavingRecord.copyOf(savingRecordRecord, (updated) => {
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
      {...getOverrideProps(overrides, "SavingRecordUpdateForm")}
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
              applicationID,
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
              applicationID,
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
              applicationID,
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
      <TextField
        label="Application id"
        isRequired={false}
        isReadOnly={false}
        value={applicationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              institution,
              estimatedAmount,
              applicationID: value,
              ownerApplicant,
            };
            const result = onChange(modelFields);
            value = result?.applicationID ?? value;
          }
          if (errors.applicationID?.hasError) {
            runValidationTasks("applicationID", value);
          }
          setApplicationID(value);
        }}
        onBlur={() => runValidationTasks("applicationID", applicationID)}
        errorMessage={errors.applicationID?.errorMessage}
        hasError={errors.applicationID?.hasError}
        {...getOverrideProps(overrides, "applicationID")}
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
              applicationID,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || savingRecordModelProp)}
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
              !(idProp || savingRecordModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
