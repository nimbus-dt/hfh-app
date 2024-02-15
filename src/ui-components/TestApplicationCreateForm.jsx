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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { TestApplication } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TestApplicationCreateForm(props) {
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
    lastSection: "",
    submittedDate: "",
    reviewStatus: "",
    submissionStatus: "",
    props: "",
    type: "",
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [lastSection, setLastSection] = React.useState(
    initialValues.lastSection
  );
  const [submittedDate, setSubmittedDate] = React.useState(
    initialValues.submittedDate
  );
  const [reviewStatus, setReviewStatus] = React.useState(
    initialValues.reviewStatus
  );
  const [submissionStatus, setSubmissionStatus] = React.useState(
    initialValues.submissionStatus
  );
  const [props, setProps] = React.useState(initialValues.props);
  const [type, setType] = React.useState(initialValues.type);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwnerID(initialValues.ownerID);
    setLastSection(initialValues.lastSection);
    setSubmittedDate(initialValues.submittedDate);
    setReviewStatus(initialValues.reviewStatus);
    setSubmissionStatus(initialValues.submissionStatus);
    setProps(initialValues.props);
    setType(initialValues.type);
    setErrors({});
  };
  const validations = {
    ownerID: [],
    lastSection: [],
    submittedDate: [{ type: "Required" }],
    reviewStatus: [],
    submissionStatus: [{ type: "Required" }],
    props: [{ type: "JSON" }],
    type: [{ type: "Required" }],
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
          lastSection,
          submittedDate,
          reviewStatus,
          submissionStatus,
          props,
          type,
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
          await DataStore.save(new TestApplication(modelFields));
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
      {...getOverrideProps(overrides, "TestApplicationCreateForm")}
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
              lastSection,
              submittedDate,
              reviewStatus,
              submissionStatus,
              props,
              type,
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
        label="Last section"
        isRequired={false}
        isReadOnly={false}
        value={lastSection}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection: value,
              submittedDate,
              reviewStatus,
              submissionStatus,
              props,
              type,
            };
            const result = onChange(modelFields);
            value = result?.lastSection ?? value;
          }
          if (errors.lastSection?.hasError) {
            runValidationTasks("lastSection", value);
          }
          setLastSection(value);
        }}
        onBlur={() => runValidationTasks("lastSection", lastSection)}
        errorMessage={errors.lastSection?.errorMessage}
        hasError={errors.lastSection?.hasError}
        {...getOverrideProps(overrides, "lastSection")}
      ></TextField>
      <TextField
        label="Submitted date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={submittedDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection,
              submittedDate: value,
              reviewStatus,
              submissionStatus,
              props,
              type,
            };
            const result = onChange(modelFields);
            value = result?.submittedDate ?? value;
          }
          if (errors.submittedDate?.hasError) {
            runValidationTasks("submittedDate", value);
          }
          setSubmittedDate(value);
        }}
        onBlur={() => runValidationTasks("submittedDate", submittedDate)}
        errorMessage={errors.submittedDate?.errorMessage}
        hasError={errors.submittedDate?.hasError}
        {...getOverrideProps(overrides, "submittedDate")}
      ></TextField>
      <TextField
        label="Review status"
        isRequired={false}
        isReadOnly={false}
        value={reviewStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection,
              submittedDate,
              reviewStatus: value,
              submissionStatus,
              props,
              type,
            };
            const result = onChange(modelFields);
            value = result?.reviewStatus ?? value;
          }
          if (errors.reviewStatus?.hasError) {
            runValidationTasks("reviewStatus", value);
          }
          setReviewStatus(value);
        }}
        onBlur={() => runValidationTasks("reviewStatus", reviewStatus)}
        errorMessage={errors.reviewStatus?.errorMessage}
        hasError={errors.reviewStatus?.hasError}
        {...getOverrideProps(overrides, "reviewStatus")}
      ></TextField>
      <SelectField
        label="Submission status"
        placeholder="Please select an option"
        isDisabled={false}
        value={submissionStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection,
              submittedDate,
              reviewStatus,
              submissionStatus: value,
              props,
              type,
            };
            const result = onChange(modelFields);
            value = result?.submissionStatus ?? value;
          }
          if (errors.submissionStatus?.hasError) {
            runValidationTasks("submissionStatus", value);
          }
          setSubmissionStatus(value);
        }}
        onBlur={() => runValidationTasks("submissionStatus", submissionStatus)}
        errorMessage={errors.submissionStatus?.errorMessage}
        hasError={errors.submissionStatus?.hasError}
        {...getOverrideProps(overrides, "submissionStatus")}
      >
        <option
          children="Submitted"
          value="SUBMITTED"
          {...getOverrideProps(overrides, "submissionStatusoption0")}
        ></option>
        <option
          children="Unsubmitted"
          value="UNSUBMITTED"
          {...getOverrideProps(overrides, "submissionStatusoption1")}
        ></option>
        <option
          children="Returned"
          value="RETURNED"
          {...getOverrideProps(overrides, "submissionStatusoption2")}
        ></option>
      </SelectField>
      <TextAreaField
        label="Props"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection,
              submittedDate,
              reviewStatus,
              submissionStatus,
              props: value,
              type,
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
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              lastSection,
              submittedDate,
              reviewStatus,
              submissionStatus,
              props,
              type: value,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Online"
          value="ONLINE"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Paper"
          value="PAPER"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
      </SelectField>
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
