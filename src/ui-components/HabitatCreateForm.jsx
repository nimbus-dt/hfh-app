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
  Text,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Habitat } from "../models";
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
export default function HabitatCreateForm(props) {
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
    urlName: "",
    state: "",
    city: "",
    county: "",
    countiesServed: [],
    props: "",
    users: [],
    AMI: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [urlName, setUrlName] = React.useState(initialValues.urlName);
  const [state, setState] = React.useState(initialValues.state);
  const [city, setCity] = React.useState(initialValues.city);
  const [county, setCounty] = React.useState(initialValues.county);
  const [countiesServed, setCountiesServed] = React.useState(
    initialValues.countiesServed
  );
  const [props, setProps] = React.useState(initialValues.props);
  const [users, setUsers] = React.useState(initialValues.users);
  const [AMI, setAMI] = React.useState(initialValues.AMI);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setUrlName(initialValues.urlName);
    setState(initialValues.state);
    setCity(initialValues.city);
    setCounty(initialValues.county);
    setCountiesServed(initialValues.countiesServed);
    setCurrentCountiesServedValue("");
    setProps(initialValues.props);
    setUsers(initialValues.users);
    setCurrentUsersValue("");
    setAMI(initialValues.AMI);
    setCurrentAMIValue("");
    setErrors({});
  };
  const [currentCountiesServedValue, setCurrentCountiesServedValue] =
    React.useState("");
  const countiesServedRef = React.createRef();
  const [currentUsersValue, setCurrentUsersValue] = React.useState("");
  const usersRef = React.createRef();
  const [currentAMIValue, setCurrentAMIValue] = React.useState("");
  const AMIRef = React.createRef();
  const validations = {
    name: [],
    urlName: [],
    state: [],
    city: [],
    county: [],
    countiesServed: [],
    props: [{ type: "JSON" }],
    users: [],
    AMI: [],
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
          urlName,
          state,
          city,
          county,
          countiesServed,
          props,
          users,
          AMI,
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
          await DataStore.save(new Habitat(modelFields));
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
      {...getOverrideProps(overrides, "HabitatCreateForm")}
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
              urlName,
              state,
              city,
              county,
              countiesServed,
              props,
              users,
              AMI,
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
        label="Url name"
        isRequired={false}
        isReadOnly={false}
        value={urlName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              urlName: value,
              state,
              city,
              county,
              countiesServed,
              props,
              users,
              AMI,
            };
            const result = onChange(modelFields);
            value = result?.urlName ?? value;
          }
          if (errors.urlName?.hasError) {
            runValidationTasks("urlName", value);
          }
          setUrlName(value);
        }}
        onBlur={() => runValidationTasks("urlName", urlName)}
        errorMessage={errors.urlName?.errorMessage}
        hasError={errors.urlName?.hasError}
        {...getOverrideProps(overrides, "urlName")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state: value,
              city,
              county,
              countiesServed,
              props,
              users,
              AMI,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city: value,
              county,
              countiesServed,
              props,
              users,
              AMI,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="County"
        isRequired={false}
        isReadOnly={false}
        value={county}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city,
              county: value,
              countiesServed,
              props,
              users,
              AMI,
            };
            const result = onChange(modelFields);
            value = result?.county ?? value;
          }
          if (errors.county?.hasError) {
            runValidationTasks("county", value);
          }
          setCounty(value);
        }}
        onBlur={() => runValidationTasks("county", county)}
        errorMessage={errors.county?.errorMessage}
        hasError={errors.county?.hasError}
        {...getOverrideProps(overrides, "county")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city,
              county,
              countiesServed: values,
              props,
              users,
              AMI,
            };
            const result = onChange(modelFields);
            values = result?.countiesServed ?? values;
          }
          setCountiesServed(values);
          setCurrentCountiesServedValue("");
        }}
        currentFieldValue={currentCountiesServedValue}
        label={"Counties served"}
        items={countiesServed}
        hasError={errors?.countiesServed?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("countiesServed", currentCountiesServedValue)
        }
        errorMessage={errors?.countiesServed?.errorMessage}
        setFieldValue={setCurrentCountiesServedValue}
        inputFieldRef={countiesServedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Counties served"
          isRequired={false}
          isReadOnly={false}
          value={currentCountiesServedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.countiesServed?.hasError) {
              runValidationTasks("countiesServed", value);
            }
            setCurrentCountiesServedValue(value);
          }}
          onBlur={() =>
            runValidationTasks("countiesServed", currentCountiesServedValue)
          }
          errorMessage={errors.countiesServed?.errorMessage}
          hasError={errors.countiesServed?.hasError}
          ref={countiesServedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "countiesServed")}
        ></TextField>
      </ArrayField>
      <TextAreaField
        label="Props"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city,
              county,
              countiesServed,
              props: value,
              users,
              AMI,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city,
              county,
              countiesServed,
              props,
              users: values,
              AMI,
            };
            const result = onChange(modelFields);
            values = result?.users ?? values;
          }
          setUsers(values);
          setCurrentUsersValue("");
        }}
        currentFieldValue={currentUsersValue}
        label={"Users"}
        items={users}
        hasError={errors?.users?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("users", currentUsersValue)
        }
        errorMessage={errors?.users?.errorMessage}
        setFieldValue={setCurrentUsersValue}
        inputFieldRef={usersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Users"
          isRequired={false}
          isReadOnly={false}
          value={currentUsersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.users?.hasError) {
              runValidationTasks("users", value);
            }
            setCurrentUsersValue(value);
          }}
          onBlur={() => runValidationTasks("users", currentUsersValue)}
          errorMessage={errors.users?.errorMessage}
          hasError={errors.users?.hasError}
          ref={usersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "users")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              urlName,
              state,
              city,
              county,
              countiesServed,
              props,
              users,
              AMI: values,
            };
            const result = onChange(modelFields);
            values = result?.AMI ?? values;
          }
          setAMI(values);
          setCurrentAMIValue("");
        }}
        currentFieldValue={currentAMIValue}
        label={"Ami"}
        items={AMI}
        hasError={errors?.AMI?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("AMI", currentAMIValue)
        }
        errorMessage={errors?.AMI?.errorMessage}
        setFieldValue={setCurrentAMIValue}
        inputFieldRef={AMIRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Ami"
          isRequired={false}
          isReadOnly={false}
          value={currentAMIValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.AMI?.hasError) {
              runValidationTasks("AMI", value);
            }
            setCurrentAMIValue(value);
          }}
          onBlur={() => runValidationTasks("AMI", currentAMIValue)}
          errorMessage={errors.AMI?.errorMessage}
          hasError={errors.AMI?.hasError}
          ref={AMIRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "AMI")}
        ></TextField>
      </ArrayField>
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
