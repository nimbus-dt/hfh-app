/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { IncomeRecord } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function IncomeRecordCreateForm(props) {
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
    typeOfIncome: "",
    employer: "",
    estimatedMonthlyIncome: "",
    proofOfIncome: [],
    ownerApplicant: false,
    employmentTime: "",
  };
  const [ownerID, setOwnerID] = React.useState(initialValues.ownerID);
  const [typeOfIncome, setTypeOfIncome] = React.useState(
    initialValues.typeOfIncome
  );
  const [employer, setEmployer] = React.useState(initialValues.employer);
  const [estimatedMonthlyIncome, setEstimatedMonthlyIncome] = React.useState(
    initialValues.estimatedMonthlyIncome
  );
  const [proofOfIncome, setProofOfIncome] = React.useState(
    initialValues.proofOfIncome
  );
  const [ownerApplicant, setOwnerApplicant] = React.useState(
    initialValues.ownerApplicant
  );
  const [employmentTime, setEmploymentTime] = React.useState(
    initialValues.employmentTime
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setOwnerID(initialValues.ownerID);
    setTypeOfIncome(initialValues.typeOfIncome);
    setEmployer(initialValues.employer);
    setEstimatedMonthlyIncome(initialValues.estimatedMonthlyIncome);
    setProofOfIncome(initialValues.proofOfIncome);
    setCurrentProofOfIncomeValue("");
    setOwnerApplicant(initialValues.ownerApplicant);
    setEmploymentTime(initialValues.employmentTime);
    setErrors({});
  };
  const [currentProofOfIncomeValue, setCurrentProofOfIncomeValue] =
    React.useState("");
  const proofOfIncomeRef = React.createRef();
  const validations = {
    ownerID: [],
    typeOfIncome: [],
    employer: [],
    estimatedMonthlyIncome: [],
    proofOfIncome: [],
    ownerApplicant: [],
    employmentTime: [],
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
          typeOfIncome,
          employer,
          estimatedMonthlyIncome,
          proofOfIncome,
          ownerApplicant,
          employmentTime,
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
          await DataStore.save(new IncomeRecord(modelFields));
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
      {...getOverrideProps(overrides, "IncomeRecordCreateForm")}
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
              typeOfIncome,
              employer,
              estimatedMonthlyIncome,
              proofOfIncome,
              ownerApplicant,
              employmentTime,
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
      <SelectField
        label="Type of income"
        placeholder="Please select an option"
        isDisabled={false}
        value={typeOfIncome}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              typeOfIncome: value,
              employer,
              estimatedMonthlyIncome,
              proofOfIncome,
              ownerApplicant,
              employmentTime,
            };
            const result = onChange(modelFields);
            value = result?.typeOfIncome ?? value;
          }
          if (errors.typeOfIncome?.hasError) {
            runValidationTasks("typeOfIncome", value);
          }
          setTypeOfIncome(value);
        }}
        onBlur={() => runValidationTasks("typeOfIncome", typeOfIncome)}
        errorMessage={errors.typeOfIncome?.errorMessage}
        hasError={errors.typeOfIncome?.hasError}
        {...getOverrideProps(overrides, "typeOfIncome")}
      >
        <option
          children="Salaried employment"
          value="SALARIED_EMPLOYMENT"
          {...getOverrideProps(overrides, "typeOfIncomeoption0")}
        ></option>
        <option
          children="Hourly employment"
          value="HOURLY_EMPLOYMENT"
          {...getOverrideProps(overrides, "typeOfIncomeoption1")}
        ></option>
        <option
          children="Self employment"
          value="SELF_EMPLOYMENT"
          {...getOverrideProps(overrides, "typeOfIncomeoption2")}
        ></option>
        <option
          children="Social security disability insurance"
          value="SOCIAL_SECURITY_DISABILITY_INSURANCE"
          {...getOverrideProps(overrides, "typeOfIncomeoption3")}
        ></option>
        <option
          children="Social security benefits"
          value="SOCIAL_SECURITY_BENEFITS"
          {...getOverrideProps(overrides, "typeOfIncomeoption4")}
        ></option>
        <option
          children="Supplemental security income"
          value="SUPPLEMENTAL_SECURITY_INCOME"
          {...getOverrideProps(overrides, "typeOfIncomeoption5")}
        ></option>
        <option
          children="Housing voucher"
          value="HOUSING_VOUCHER"
          {...getOverrideProps(overrides, "typeOfIncomeoption6")}
        ></option>
        <option
          children="Child support"
          value="CHILD_SUPPORT"
          {...getOverrideProps(overrides, "typeOfIncomeoption7")}
        ></option>
        <option
          children="Alimony support"
          value="ALIMONY_SUPPORT"
          {...getOverrideProps(overrides, "typeOfIncomeoption8")}
        ></option>
        <option
          children="Veterans affair compensation"
          value="VETERANS_AFFAIR_COMPENSATION"
          {...getOverrideProps(overrides, "typeOfIncomeoption9")}
        ></option>
        <option
          children="Pension payments"
          value="PENSION_PAYMENTS"
          {...getOverrideProps(overrides, "typeOfIncomeoption10")}
        ></option>
        <option
          children="Military entitlements"
          value="MILITARY_ENTITLEMENTS"
          {...getOverrideProps(overrides, "typeOfIncomeoption11")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "typeOfIncomeoption12")}
        ></option>
      </SelectField>
      <TextField
        label="Employer"
        isRequired={false}
        isReadOnly={false}
        value={employer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ownerID,
              typeOfIncome,
              employer: value,
              estimatedMonthlyIncome,
              proofOfIncome,
              ownerApplicant,
              employmentTime,
            };
            const result = onChange(modelFields);
            value = result?.employer ?? value;
          }
          if (errors.employer?.hasError) {
            runValidationTasks("employer", value);
          }
          setEmployer(value);
        }}
        onBlur={() => runValidationTasks("employer", employer)}
        errorMessage={errors.employer?.errorMessage}
        hasError={errors.employer?.hasError}
        {...getOverrideProps(overrides, "employer")}
      ></TextField>
      <TextField
        label="Estimated monthly income"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimatedMonthlyIncome}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerID,
              typeOfIncome,
              employer,
              estimatedMonthlyIncome: value,
              proofOfIncome,
              ownerApplicant,
              employmentTime,
            };
            const result = onChange(modelFields);
            value = result?.estimatedMonthlyIncome ?? value;
          }
          if (errors.estimatedMonthlyIncome?.hasError) {
            runValidationTasks("estimatedMonthlyIncome", value);
          }
          setEstimatedMonthlyIncome(value);
        }}
        onBlur={() =>
          runValidationTasks("estimatedMonthlyIncome", estimatedMonthlyIncome)
        }
        errorMessage={errors.estimatedMonthlyIncome?.errorMessage}
        hasError={errors.estimatedMonthlyIncome?.hasError}
        {...getOverrideProps(overrides, "estimatedMonthlyIncome")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              ownerID,
              typeOfIncome,
              employer,
              estimatedMonthlyIncome,
              proofOfIncome: values,
              ownerApplicant,
              employmentTime,
            };
            const result = onChange(modelFields);
            values = result?.proofOfIncome ?? values;
          }
          setProofOfIncome(values);
          setCurrentProofOfIncomeValue("");
        }}
        currentFieldValue={currentProofOfIncomeValue}
        label={"Proof of income"}
        items={proofOfIncome}
        hasError={errors?.proofOfIncome?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("proofOfIncome", currentProofOfIncomeValue)
        }
        errorMessage={errors?.proofOfIncome?.errorMessage}
        setFieldValue={setCurrentProofOfIncomeValue}
        inputFieldRef={proofOfIncomeRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Proof of income"
          isRequired={false}
          isReadOnly={false}
          value={currentProofOfIncomeValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.proofOfIncome?.hasError) {
              runValidationTasks("proofOfIncome", value);
            }
            setCurrentProofOfIncomeValue(value);
          }}
          onBlur={() =>
            runValidationTasks("proofOfIncome", currentProofOfIncomeValue)
          }
          errorMessage={errors.proofOfIncome?.errorMessage}
          hasError={errors.proofOfIncome?.hasError}
          ref={proofOfIncomeRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "proofOfIncome")}
        ></TextField>
      </ArrayField>
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
              typeOfIncome,
              employer,
              estimatedMonthlyIncome,
              proofOfIncome,
              ownerApplicant: value,
              employmentTime,
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
      <TextField
        label="Employment time"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={employmentTime}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              ownerID,
              typeOfIncome,
              employer,
              estimatedMonthlyIncome,
              proofOfIncome,
              ownerApplicant,
              employmentTime: value,
            };
            const result = onChange(modelFields);
            value = result?.employmentTime ?? value;
          }
          if (errors.employmentTime?.hasError) {
            runValidationTasks("employmentTime", value);
          }
          setEmploymentTime(value);
        }}
        onBlur={() => runValidationTasks("employmentTime", employmentTime)}
        errorMessage={errors.employmentTime?.errorMessage}
        hasError={errors.employmentTime?.hasError}
        {...getOverrideProps(overrides, "employmentTime")}
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
