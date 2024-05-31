import { View, TextField, Flex, Button, Text } from '@aws-amplify/ui-react';
import React, { useEffect, useRef } from 'react';
import { HiTrash } from 'react-icons/hi2';
import PropTypes from 'prop-types';

const FileInput = ({
  maxFileCount,
  label,
  onChange,
  files = [],
  multiple,
  isRequired,
  accept,
  isDisabled,
  hasError,
  errorMessage,
  onInvalid,
  onBlur,
}) => {
  const filesInputRef = useRef();

  const handleOnChange = (event) => {
    const newFiles = [...event.currentTarget.files];
    const filteredFiles = newFiles.filter(
      (newFile) =>
        files.find((file) => file.name === newFile.name) === undefined
    );
    const mergedFiles = [...files, ...filteredFiles];
    onChange(
      maxFileCount !== undefined && mergedFiles.length > maxFileCount
        ? mergedFiles.slice(0, maxFileCount)
        : mergedFiles
    );
  };

  const handleOnRemove = (fileName) => {
    const filteredFiles = files.filter((file) => file.name !== fileName);
    onChange(filteredFiles);
  };

  useEffect(() => {
    if (filesInputRef.current) {
      if (files) {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        filesInputRef.current.files = dataTransfer.files;
      }
    }
  }, [files]);

  return (
    <View
      width="100%"
      border="thin"
      borderColor="lightgray"
      borderStyle="solid"
      padding="1rem"
      borderRadius="medium"
    >
      <TextField
        label={label}
        descriptiveText={`Add files${!multiple ? ' one by one' : ''} ${
          maxFileCount !== undefined ? `(${maxFileCount} files max.)` : ''
        }`}
        type="file"
        accept={accept}
        onChange={handleOnChange}
        ref={filesInputRef}
        isRequired={isRequired}
        multiple={multiple}
        isDisabled={
          isDisabled ||
          onChange === undefined ||
          (maxFileCount !== undefined && files && files.length >= maxFileCount)
        }
        hasError={hasError}
        errorMessage={errorMessage}
        onInvalid={onInvalid}
        onBlur={onBlur}
      />

      {files && files.length > 0 && (
        <>
          <Text
            fontSize="0.875rem"
            fontStyle="italic"
            marginTop="0.5rem"
            variation="secondary"
          >
            Selected files:
          </Text>

          <Flex
            direction="column"
            gap="0.25rem"
            maxHeight="12.5rem"
            overflow="auto"
          >
            {Array.from(files).map((file) => (
              <Flex
                key={file.name}
                height="3rem"
                alignItems="center"
                justifyContent="center"
                gap="0.25rem"
              >
                <TextField
                  value={file.name}
                  type="text"
                  margin="0rem"
                  grow={1}
                  style={{
                    cursor: 'auto',
                  }}
                  disabled
                  labelHidden
                />
                <Button
                  title="Remove file"
                  type="button"
                  variation="destructive"
                  height="2.5rem"
                  width="2.5rem"
                  padding="0rem"
                  margin="0rem"
                  onClick={() => handleOnRemove(file.name)}
                  isDisabled={isDisabled}
                >
                  <HiTrash size={16} />
                </Button>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </View>
  );
};

FileInput.propTypes = {
  maxFileCount: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func,
  files: PropTypes.array,
  multiple: PropTypes.bool,
  isRequired: PropTypes.bool,
  accept: PropTypes.string,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onInvalid: PropTypes.func,
  onBlur: PropTypes.func,
};

export default FileInput;
