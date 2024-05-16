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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { RootForm } from "../models";
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
export default function RootFormUpdateForm(props) {
  const {
    id: idProp,
    rootForm: rootFormModelProp,
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
    status: "",
    description: "",
    files: [],
    formUrls: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [status, setStatus] = React.useState(initialValues.status);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [files, setFiles] = React.useState(initialValues.files);
  const [formUrls, setFormUrls] = React.useState(initialValues.formUrls);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = rootFormRecord
      ? { ...initialValues, ...rootFormRecord }
      : initialValues;
    setName(cleanValues.name);
    setStatus(cleanValues.status);
    setDescription(cleanValues.description);
    setFiles(cleanValues.files ?? []);
    setCurrentFilesValue("");
    setFormUrls(cleanValues.formUrls ?? []);
    setCurrentFormUrlsValue("");
    setErrors({});
  };
  const [rootFormRecord, setRootFormRecord] = React.useState(rootFormModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(RootForm, idProp)
        : rootFormModelProp;
      setRootFormRecord(record);
    };
    queryData();
  }, [idProp, rootFormModelProp]);
  React.useEffect(resetStateValues, [rootFormRecord]);
  const [currentFilesValue, setCurrentFilesValue] = React.useState("");
  const filesRef = React.createRef();
  const [currentFormUrlsValue, setCurrentFormUrlsValue] = React.useState("");
  const formUrlsRef = React.createRef();
  const validations = {
    name: [],
    status: [],
    description: [],
    files: [],
    formUrls: [{ type: "Required" }],
    formUrls: [],
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
          status,
          description,
          files,
          formUrls,
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
            RootForm.copyOf(rootFormRecord, (updated) => {
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
      {...getOverrideProps(overrides, "RootFormUpdateForm")}
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
              status,
              description,
              files,
              formUrls,
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
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              status: value,
              description,
              files,
              formUrls,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Active"
          value="ACTIVE"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Pending"
          value="PENDING"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              status,
              description: value,
              files,
              formUrls,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              status,
              description,
              files: values,
              formUrls,
            };
            const result = onChange(modelFields);
            values = result?.files ?? values;
          }
          setFiles(values);
          setCurrentFilesValue("");
        }}
        currentFieldValue={currentFilesValue}
        label={"Files"}
        items={files}
        hasError={errors?.files?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("files", currentFilesValue)
        }
        errorMessage={errors?.files?.errorMessage}
        setFieldValue={setCurrentFilesValue}
        inputFieldRef={filesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Files"
          isRequired={false}
          isReadOnly={false}
          value={currentFilesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.files?.hasError) {
              runValidationTasks("files", value);
            }
            setCurrentFilesValue(value);
          }}
          onBlur={() => runValidationTasks("files", currentFilesValue)}
          errorMessage={errors.files?.errorMessage}
          hasError={errors.files?.hasError}
          ref={filesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "files")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              status,
              description,
              files,
              formUrls: values,
            };
            const result = onChange(modelFields);
            values = result?.formUrls ?? values;
          }
          setFormUrls(values);
          setCurrentFormUrlsValue("");
        }}
        currentFieldValue={currentFormUrlsValue}
        label={"Form urls"}
        items={formUrls}
        hasError={errors?.formUrls?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("formUrls", currentFormUrlsValue)
        }
        errorMessage={errors?.formUrls?.errorMessage}
        setFieldValue={setCurrentFormUrlsValue}
        inputFieldRef={formUrlsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Form urls"
          isRequired={true}
          isReadOnly={false}
          value={currentFormUrlsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.formUrls?.hasError) {
              runValidationTasks("formUrls", value);
            }
            setCurrentFormUrlsValue(value);
          }}
          onBlur={() => runValidationTasks("formUrls", currentFormUrlsValue)}
          errorMessage={errors.formUrls?.errorMessage}
          hasError={errors.formUrls?.hasError}
          ref={formUrlsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "formUrls")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || rootFormModelProp)}
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
              !(idProp || rootFormModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
