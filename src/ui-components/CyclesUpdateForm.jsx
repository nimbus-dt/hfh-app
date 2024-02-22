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
import { Cycles } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CyclesUpdateForm(props) {
  const {
    id: idProp,
    cycles: cyclesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cycleStartDate: "",
    cycleEndDate: "",
    cycleStatus: false,
    cycleSeason: "",
  };
  const [cycleStartDate, setCycleStartDate] = React.useState(
    initialValues.cycleStartDate
  );
  const [cycleEndDate, setCycleEndDate] = React.useState(
    initialValues.cycleEndDate
  );
  const [cycleStatus, setCycleStatus] = React.useState(
    initialValues.cycleStatus
  );
  const [cycleSeason, setCycleSeason] = React.useState(
    initialValues.cycleSeason
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = cyclesRecord
      ? { ...initialValues, ...cyclesRecord }
      : initialValues;
    setCycleStartDate(cleanValues.cycleStartDate);
    setCycleEndDate(cleanValues.cycleEndDate);
    setCycleStatus(cleanValues.cycleStatus);
    setCycleSeason(cleanValues.cycleSeason);
    setErrors({});
  };
  const [cyclesRecord, setCyclesRecord] = React.useState(cyclesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Cycles, idProp)
        : cyclesModelProp;
      setCyclesRecord(record);
    };
    queryData();
  }, [idProp, cyclesModelProp]);
  React.useEffect(resetStateValues, [cyclesRecord]);
  const validations = {
    cycleStartDate: [],
    cycleEndDate: [],
    cycleStatus: [],
    cycleSeason: [],
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
          cycleStartDate,
          cycleEndDate,
          cycleStatus,
          cycleSeason,
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
            Cycles.copyOf(cyclesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CyclesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Cycle start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={cycleStartDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cycleStartDate: value,
              cycleEndDate,
              cycleStatus,
              cycleSeason,
            };
            const result = onChange(modelFields);
            value = result?.cycleStartDate ?? value;
          }
          if (errors.cycleStartDate?.hasError) {
            runValidationTasks("cycleStartDate", value);
          }
          setCycleStartDate(value);
        }}
        onBlur={() => runValidationTasks("cycleStartDate", cycleStartDate)}
        errorMessage={errors.cycleStartDate?.errorMessage}
        hasError={errors.cycleStartDate?.hasError}
        {...getOverrideProps(overrides, "cycleStartDate")}
      ></TextField>
      <TextField
        label="Cycle end date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={cycleEndDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cycleStartDate,
              cycleEndDate: value,
              cycleStatus,
              cycleSeason,
            };
            const result = onChange(modelFields);
            value = result?.cycleEndDate ?? value;
          }
          if (errors.cycleEndDate?.hasError) {
            runValidationTasks("cycleEndDate", value);
          }
          setCycleEndDate(value);
        }}
        onBlur={() => runValidationTasks("cycleEndDate", cycleEndDate)}
        errorMessage={errors.cycleEndDate?.errorMessage}
        hasError={errors.cycleEndDate?.hasError}
        {...getOverrideProps(overrides, "cycleEndDate")}
      ></TextField>
      <SwitchField
        label="Cycle status"
        defaultChecked={false}
        isDisabled={false}
        isChecked={cycleStatus}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              cycleStartDate,
              cycleEndDate,
              cycleStatus: value,
              cycleSeason,
            };
            const result = onChange(modelFields);
            value = result?.cycleStatus ?? value;
          }
          if (errors.cycleStatus?.hasError) {
            runValidationTasks("cycleStatus", value);
          }
          setCycleStatus(value);
        }}
        onBlur={() => runValidationTasks("cycleStatus", cycleStatus)}
        errorMessage={errors.cycleStatus?.errorMessage}
        hasError={errors.cycleStatus?.hasError}
        {...getOverrideProps(overrides, "cycleStatus")}
      ></SwitchField>
      <TextField
        label="Cycle season"
        isRequired={false}
        isReadOnly={false}
        value={cycleSeason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cycleStartDate,
              cycleEndDate,
              cycleStatus,
              cycleSeason: value,
            };
            const result = onChange(modelFields);
            value = result?.cycleSeason ?? value;
          }
          if (errors.cycleSeason?.hasError) {
            runValidationTasks("cycleSeason", value);
          }
          setCycleSeason(value);
        }}
        onBlur={() => runValidationTasks("cycleSeason", cycleSeason)}
        errorMessage={errors.cycleSeason?.errorMessage}
        hasError={errors.cycleSeason?.hasError}
        {...getOverrideProps(overrides, "cycleSeason")}
      ></TextField>
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
          isDisabled={!(idProp || cyclesModelProp)}
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
              !(idProp || cyclesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
