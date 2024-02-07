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
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { Application } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationUpdateForm(props) {
  const {
    id: idProp,
    application: applicationModelProp,
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
    habitatID: "",
    submitted: false,
    dateSubmitted: "",
    submittedStatus: "",
    habitatRevisor: "",
    dateRevised: "",
    ownerName: "",
    timeStatus: "",
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [habitatID, setHabitatID] = React.useState(initialValues.habitatID);
  const [submitted, setSubmitted] = React.useState(initialValues.submitted);
  const [dateSubmitted, setDateSubmitted] = React.useState(
    initialValues.dateSubmitted
  );
  const [submittedStatus, setSubmittedStatus] = React.useState(
    initialValues.submittedStatus
  );
  const [habitatRevisor, setHabitatRevisor] = React.useState(
    initialValues.habitatRevisor
  );
  const [dateRevised, setDateRevised] = React.useState(
    initialValues.dateRevised
  );
  const [ownerName, setOwnerName] = React.useState(initialValues.ownerName);
  const [timeStatus, setTimeStatus] = React.useState(initialValues.timeStatus);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationRecord
      ? { ...initialValues, ...applicationRecord }
      : initialValues;
    setOwnerID(cleanValues.ownerID);
    setHabitatID(cleanValues.habitatID);
    setSubmitted(cleanValues.submitted);
    setDateSubmitted(cleanValues.dateSubmitted);
    setSubmittedStatus(cleanValues.submittedStatus);
    setHabitatRevisor(cleanValues.habitatRevisor);
    setDateRevised(cleanValues.dateRevised);
    setOwnerName(cleanValues.ownerName);
    setTimeStatus(cleanValues.timeStatus);
    setErrors({});
  };
  const [applicationRecord, setApplicationRecord] =
    React.useState(applicationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Application, idProp)
        : applicationModelProp;
      setApplicationRecord(record);
    };
    queryData();
  }, [idProp, applicationModelProp]);
  React.useEffect(resetStateValues, [applicationRecord]);
  const validations = {
    ownerID: [],
    habitatID: [{ type: "Required" }],
    submitted: [],
    dateSubmitted: [],
    submittedStatus: [],
    habitatRevisor: [],
    dateRevised: [],
    ownerName: [],
    timeStatus: [],
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
          habitatID,
          submitted,
          dateSubmitted,
          submittedStatus,
          habitatRevisor,
          dateRevised,
          ownerName,
          timeStatus,
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
            Application.copyOf(applicationRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ApplicationUpdateForm")}
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
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus,
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
        label="Habitat id"
        isRequired={true}
        isReadOnly={false}
        value={habitatID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              habitatID: value,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus,
            };
            const result = onChange(modelFields);
            value = result?.habitatID ?? value;
          }
          if (errors.habitatID?.hasError) {
            runValidationTasks("habitatID", value);
          }
          setHabitatID(value);
        }}
        onBlur={() => runValidationTasks("habitatID", habitatID)}
        errorMessage={errors.habitatID?.errorMessage}
        hasError={errors.habitatID?.hasError}
        {...getOverrideProps(overrides, "habitatID")}
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
              habitatID,
              submitted: value,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus,
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
              habitatID,
              submitted,
              dateSubmitted: value,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus,
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
      <SelectField
        label="Submitted status"
        placeholder="Please select an option"
        isDisabled={false}
        value={submittedStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus: value,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus,
            };
            const result = onChange(modelFields);
            value = result?.submittedStatus ?? value;
          }
          if (errors.submittedStatus?.hasError) {
            runValidationTasks("submittedStatus", value);
          }
          setSubmittedStatus(value);
        }}
        onBlur={() => runValidationTasks("submittedStatus", submittedStatus)}
        errorMessage={errors.submittedStatus?.errorMessage}
        hasError={errors.submittedStatus?.hasError}
        {...getOverrideProps(overrides, "submittedStatus")}
      >
        <option
          children="Accepted"
          value="ACCEPTED"
          {...getOverrideProps(overrides, "submittedStatusoption0")}
        ></option>
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, "submittedStatusoption1")}
        ></option>
        <option
          children="Rejected"
          value="REJECTED"
          {...getOverrideProps(overrides, "submittedStatusoption2")}
        ></option>
      </SelectField>
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
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor: value,
              dateRevised,
              ownerName,
              timeStatus,
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
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised: value,
              ownerName,
              timeStatus,
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
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName: value,
              timeStatus,
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
      <SelectField
        label="Time status"
        placeholder="Please select an option"
        isDisabled={false}
        value={timeStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              habitatID,
              submitted,
              dateSubmitted,
              submittedStatus,
              habitatRevisor,
              dateRevised,
              ownerName,
              timeStatus: value,
            };
            const result = onChange(modelFields);
            value = result?.timeStatus ?? value;
          }
          if (errors.timeStatus?.hasError) {
            runValidationTasks("timeStatus", value);
          }
          setTimeStatus(value);
        }}
        onBlur={() => runValidationTasks("timeStatus", timeStatus)}
        errorMessage={errors.timeStatus?.errorMessage}
        hasError={errors.timeStatus?.hasError}
        {...getOverrideProps(overrides, "timeStatus")}
      >
        <option
          children="Current"
          value="CURRENT"
          {...getOverrideProps(overrides, "timeStatusoption0")}
        ></option>
        <option
          children="Past"
          value="PAST"
          {...getOverrideProps(overrides, "timeStatusoption1")}
        ></option>
      </SelectField>
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
          isDisabled={!(idProp || applicationModelProp)}
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
              !(idProp || applicationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
