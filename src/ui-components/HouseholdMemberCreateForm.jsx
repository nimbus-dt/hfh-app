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
import { HouseholdMember } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function HouseholdMemberCreateForm(props) {
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
    name: "",
    dateOfBirth: "",
    sex: "",
    relationship: "",
    isUnemployed: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [sex, setSex] = React.useState(initialValues.sex);
  const [relationship, setRelationship] = React.useState(
    initialValues.relationship
  );
  const [isUnemployed, setIsUnemployed] = React.useState(
    initialValues.isUnemployed
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setDateOfBirth(initialValues.dateOfBirth);
    setSex(initialValues.sex);
    setRelationship(initialValues.relationship);
    setIsUnemployed(initialValues.isUnemployed);
    setErrors({});
  };
  const validations = {
    name: [],
    dateOfBirth: [],
    sex: [],
    relationship: [],
    isUnemployed: [],
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
          name,
          dateOfBirth,
          sex,
          relationship,
          isUnemployed,
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
          await DataStore.save(new HouseholdMember(modelFields));
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
      {...getOverrideProps(overrides, "HouseholdMemberCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              dateOfBirth,
              sex,
              relationship,
              isUnemployed,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth: value,
              sex,
              relationship,
              isUnemployed,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <SelectField
        label="Sex"
        placeholder="Please select an option"
        isDisabled={false}
        value={sex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              sex: value,
              relationship,
              isUnemployed,
            };
            const result = onChange(modelFields);
            value = result?.sex ?? value;
          }
          if (errors.sex?.hasError) {
            runValidationTasks("sex", value);
          }
          setSex(value);
        }}
        onBlur={() => runValidationTasks("sex", sex)}
        errorMessage={errors.sex?.errorMessage}
        hasError={errors.sex?.hasError}
        {...getOverrideProps(overrides, "sex")}
      >
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "sexoption0")}
        ></option>
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "sexoption1")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "sexoption2")}
        ></option>
      </SelectField>
      <SelectField
        label="Relationship"
        placeholder="Please select an option"
        isDisabled={false}
        value={relationship}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              sex,
              relationship: value,
              isUnemployed,
            };
            const result = onChange(modelFields);
            value = result?.relationship ?? value;
          }
          if (errors.relationship?.hasError) {
            runValidationTasks("relationship", value);
          }
          setRelationship(value);
        }}
        onBlur={() => runValidationTasks("relationship", relationship)}
        errorMessage={errors.relationship?.errorMessage}
        hasError={errors.relationship?.hasError}
        {...getOverrideProps(overrides, "relationship")}
      >
        <option
          children="Spouse"
          value="SPOUSE"
          {...getOverrideProps(overrides, "relationshipoption0")}
        ></option>
        <option
          children="Son"
          value="SON"
          {...getOverrideProps(overrides, "relationshipoption1")}
        ></option>
        <option
          children="Daughter"
          value="DAUGHTER"
          {...getOverrideProps(overrides, "relationshipoption2")}
        ></option>
        <option
          children="Nephew"
          value="NEPHEW"
          {...getOverrideProps(overrides, "relationshipoption3")}
        ></option>
        <option
          children="Niece"
          value="NIECE"
          {...getOverrideProps(overrides, "relationshipoption4")}
        ></option>
        <option
          children="Parent"
          value="PARENT"
          {...getOverrideProps(overrides, "relationshipoption5")}
        ></option>
        <option
          children="Sibling"
          value="SIBLING"
          {...getOverrideProps(overrides, "relationshipoption6")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "relationshipoption7")}
        ></option>
      </SelectField>
      <SwitchField
        label="Is unemployed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isUnemployed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              dateOfBirth,
              sex,
              relationship,
              isUnemployed: value,
            };
            const result = onChange(modelFields);
            value = result?.isUnemployed ?? value;
          }
          if (errors.isUnemployed?.hasError) {
            runValidationTasks("isUnemployed", value);
          }
          setIsUnemployed(value);
        }}
        onBlur={() => runValidationTasks("isUnemployed", isUnemployed)}
        errorMessage={errors.isUnemployed?.errorMessage}
        hasError={errors.isUnemployed?.hasError}
        {...getOverrideProps(overrides, "isUnemployed")}
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
