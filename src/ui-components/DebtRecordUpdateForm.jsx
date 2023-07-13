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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { DebtRecord } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DebtRecordUpdateForm(props) {
  const {
    id: idProp,
    debtRecord: debtRecordModelProp,
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
    monthlyRecurrence: "",
    typeOfDebt: "",
    estimatedAmount: "",
    ownerApplicant: false,
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [monthlyRecurrence, setMonthlyRecurrence] = React.useState(
    initialValues.monthlyRecurrence
  );
  const [typeOfDebt, setTypeOfDebt] = React.useState(initialValues.typeOfDebt);
  const [estimatedAmount, setEstimatedAmount] = React.useState(
    initialValues.estimatedAmount
  );
  const [ownerApplicant, setOwnerApplicant] = React.useState(
    initialValues.ownerApplicant
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = debtRecordRecord
      ? { ...initialValues, ...debtRecordRecord }
      : initialValues;
    setOwnerID(cleanValues.ownerID);
    setMonthlyRecurrence(cleanValues.monthlyRecurrence);
    setTypeOfDebt(cleanValues.typeOfDebt);
    setEstimatedAmount(cleanValues.estimatedAmount);
    setOwnerApplicant(cleanValues.ownerApplicant);
    setErrors({});
  };
  const [debtRecordRecord, setDebtRecordRecord] =
    React.useState(debtRecordModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(DebtRecord, idProp)
        : debtRecordModelProp;
      setDebtRecordRecord(record);
    };
    queryData();
  }, [idProp, debtRecordModelProp]);
  React.useEffect(resetStateValues, [debtRecordRecord]);
  const validations = {
    ownerID: [],
    monthlyRecurrence: [],
    typeOfDebt: [],
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
          monthlyRecurrence,
          typeOfDebt,
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
          await DataStore.save(
            DebtRecord.copyOf(debtRecordRecord, (updated) => {
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
      {...getOverrideProps(overrides, "DebtRecordUpdateForm")}
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
              monthlyRecurrence,
              typeOfDebt,
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
        label="Monthly recurrence"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthlyRecurrence}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerID,
              monthlyRecurrence: value,
              typeOfDebt,
              estimatedAmount,
              ownerApplicant,
            };
            const result = onChange(modelFields);
            value = result?.monthlyRecurrence ?? value;
          }
          if (errors.monthlyRecurrence?.hasError) {
            runValidationTasks("monthlyRecurrence", value);
          }
          setMonthlyRecurrence(value);
        }}
        onBlur={() =>
          runValidationTasks("monthlyRecurrence", monthlyRecurrence)
        }
        errorMessage={errors.monthlyRecurrence?.errorMessage}
        hasError={errors.monthlyRecurrence?.hasError}
        {...getOverrideProps(overrides, "monthlyRecurrence")}
      ></TextField>
      <SelectField
        label="Type of debt"
        placeholder="Please select an option"
        isDisabled={false}
        value={typeOfDebt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              monthlyRecurrence,
              typeOfDebt: value,
              estimatedAmount,
              ownerApplicant,
            };
            const result = onChange(modelFields);
            value = result?.typeOfDebt ?? value;
          }
          if (errors.typeOfDebt?.hasError) {
            runValidationTasks("typeOfDebt", value);
          }
          setTypeOfDebt(value);
        }}
        onBlur={() => runValidationTasks("typeOfDebt", typeOfDebt)}
        errorMessage={errors.typeOfDebt?.errorMessage}
        hasError={errors.typeOfDebt?.hasError}
        {...getOverrideProps(overrides, "typeOfDebt")}
      >
        <option
          children="Medical"
          value="MEDICAL"
          {...getOverrideProps(overrides, "typeOfDebtoption0")}
        ></option>
        <option
          children="Student loans"
          value="STUDENT_LOANS"
          {...getOverrideProps(overrides, "typeOfDebtoption1")}
        ></option>
        <option
          children="Collections"
          value="COLLECTIONS"
          {...getOverrideProps(overrides, "typeOfDebtoption2")}
        ></option>
        <option
          children="Car"
          value="CAR"
          {...getOverrideProps(overrides, "typeOfDebtoption3")}
        ></option>
        <option
          children="Personal loans"
          value="PERSONAL_LOANS"
          {...getOverrideProps(overrides, "typeOfDebtoption4")}
        ></option>
        <option
          children="Installment loans"
          value="INSTALLMENT_LOANS"
          {...getOverrideProps(overrides, "typeOfDebtoption5")}
        ></option>
        <option
          children="Credit card"
          value="CREDIT_CARD"
          {...getOverrideProps(overrides, "typeOfDebtoption6")}
        ></option>
        <option
          children="Child support"
          value="CHILD_SUPPORT"
          {...getOverrideProps(overrides, "typeOfDebtoption7")}
        ></option>
        <option
          children="Alimony"
          value="ALIMONY"
          {...getOverrideProps(overrides, "typeOfDebtoption8")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "typeOfDebtoption9")}
        ></option>
      </SelectField>
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
              monthlyRecurrence,
              typeOfDebt,
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
              monthlyRecurrence,
              typeOfDebt,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || debtRecordModelProp)}
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
              !(idProp || debtRecordModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
