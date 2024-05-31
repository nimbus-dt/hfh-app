/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, SwitchField } from "@aws-amplify/ui-react";
import { Maintenance } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MaintenanceUpdateForm(props) {
  const {
    id: idProp,
    maintenance: maintenanceModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    maintenance: false,
  };
  const [maintenance, setMaintenance] = React.useState(
    initialValues.maintenance
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = maintenanceRecord
      ? { ...initialValues, ...maintenanceRecord }
      : initialValues;
    setMaintenance(cleanValues.maintenance);
    setErrors({});
  };
  const [maintenanceRecord, setMaintenanceRecord] =
    React.useState(maintenanceModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Maintenance, idProp)
        : maintenanceModelProp;
      setMaintenanceRecord(record);
    };
    queryData();
  }, [idProp, maintenanceModelProp]);
  React.useEffect(resetStateValues, [maintenanceRecord]);
  const validations = {
    maintenance: [],
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
          maintenance,
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
            Maintenance.copyOf(maintenanceRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MaintenanceUpdateForm")}
      {...rest}
    >
      <SwitchField
        label="Maintenance"
        defaultChecked={false}
        isDisabled={false}
        isChecked={maintenance}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              maintenance: value,
            };
            const result = onChange(modelFields);
            value = result?.maintenance ?? value;
          }
          if (errors.maintenance?.hasError) {
            runValidationTasks("maintenance", value);
          }
          setMaintenance(value);
        }}
        onBlur={() => runValidationTasks("maintenance", maintenance)}
        errorMessage={errors.maintenance?.errorMessage}
        hasError={errors.maintenance?.hasError}
        {...getOverrideProps(overrides, "maintenance")}
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
          isDisabled={!(idProp || maintenanceModelProp)}
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
              !(idProp || maintenanceModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
