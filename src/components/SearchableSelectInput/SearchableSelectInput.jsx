'use client';

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useCloseContextMenu from 'hooks/utils/useCloseContextMenu';
import { Button, Flex, TextField, View } from '@aws-amplify/ui-react';
import { boolean } from 'zod';
import { MdClose } from 'react-icons/md';

const SelectWithSearch = ({
  label,
  options,
  selectedOption,
  onClickOption = () => {},
  value,
  isDisabled,
  onUnselect,
  ...inputProperties
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const contextMenuReference = useRef(null);

  const handleOpen = () => {
    selectedOption ?? setIsFocused(true);
  };

  const handleClose = () => setIsFocused(false);

  useCloseContextMenu(contextMenuReference, handleClose);

  useEffect(() => {
    const handleClickOutsideContextMenu = (event) => {
      if (
        contextMenuReference.current &&
        event.target instanceof Element &&
        !contextMenuReference.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideContextMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideContextMenu);
    };
  }, []);
  return (
    <View position="relative" width="100%" ref={contextMenuReference}>
      <TextField
        label={label}
        {...inputProperties}
        value={selectedOption === undefined ? value : selectedOption.label}
        isDisabled={selectedOption === undefined ? isDisabled : true}
        outerEndComponent={
          selectedOption !== undefined && (
            <Button
              variation="destructive"
              padding="0.50rem"
              //   className={`text-lg hover:cursor-pointer hover hover:text-theme-red right-2 ${
              //     selectedOption === undefined ? 'hidden' : 'absolute'
              //   }`}
              title="Cancelar seleccion"
              onClick={onUnselect}
            >
              <MdClose size="1.25rem" />
            </Button>
          )
        }
        onFocus={handleOpen}
      />

      {isFocused && (
        <Flex
          direction="column"
          position="absolute"
          padding="0.25rem"
          boxShadow="large"
          width="100%"
          style={{
            zIndex: 1,
          }}
          backgroundColor="white"
          gap="0.25rem"
          borderRadius="small"
          maxHeight="25rem"
          overflow="auto"
        >
          {options.map((option) => (
            <Button
              key={option.id}
              onClick={(event) => {
                event.stopPropagation();
                onClickOption(option.id);
                handleClose();
              }}
            >
              {option.label}
            </Button>
          ))}
        </Flex>
      )}
    </View>
  );
};

const TId = PropTypes.oneOfType((PropTypes.string, PropTypes.number));

const IOption = PropTypes.shape({
  id: TId,
  label: PropTypes.string,
});

SelectWithSearch.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(IOption),
  selectedOption: IOption,
  onClickOption: PropTypes.func,
  onUnselect: PropTypes.func,
  value: TId,
  isDisabled: boolean,
};

export default SelectWithSearch;
