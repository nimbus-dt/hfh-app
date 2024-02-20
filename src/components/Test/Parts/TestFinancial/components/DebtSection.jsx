import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataStore, Storage } from 'aws-amplify';
import { Debt } from 'models';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import {
  Button,
  Flex,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  TextField,
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { MdAdd, MdClose, MdMoreHoriz } from 'react-icons/md';
import FileInput from 'components/FileInput';
import { createAlert } from 'utils/factories';
import CurrencyInput from 'components/CurrencyInput';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { debtSchema, debtTypes } from '../TestFinancial.schema';
import UploadingFileLoader from './UploadingFileLoader';

const DebtSection = ({
  ownerId,
  debts,
  setDebts,
  setAlert,
  applicationId,
  updateApplicationLastSection,
  habitat,
}) => {
  const [editingDebt, setEditingDebt] = useState();
  const [debtToDelete, setDebtToDelete] = useState();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(0);

  const {
    control,
    handleSubmit,
    register,
    reset,
    unregister,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(debtSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickAdd = () => setModal(true);

  const uploadFiles = async (files) => {
    const promisesArr = files.map((file) =>
      Storage.put(
        `financial/${habitat?.urlName}/${applicationId}/${ownerId}/debt/${file.name}`,
        file,
        {
          level: 'public',
        }
      )
    );

    const results = await Promise.all(promisesArr);

    return results;
  };

  const removeFiles = async (keys) => {
    const promisesArr = keys.map((key) =>
      Storage.remove(key, {
        level: 'public',
      })
    );
    const results = await Promise.all(promisesArr);
    return results;
  };

  const handleOnClickCloseDebtModal = () => {
    reset({
      type: undefined,
      otherType: undefined,
      monthlyPayment: undefined,
      unpaidBalance: undefined,
      monthsLeftToPaid: undefined,
      proofs: undefined,
    });
    setModal(false);
    setEditingDebt(undefined);
    setEdit(false);
  };

  const handleOnClickCloseDelete = () => setDebtToDelete(undefined);

  const handleOnClickAcceptDelete = async () => {
    try {
      const original = await DataStore.query(Debt, debtToDelete.id);
      const deletedDebt = await DataStore.delete(original);
      setDebts((previousDebts) =>
        previousDebts.filter(
          (previousDebt) => previousDebt.id !== deletedDebt.id
        )
      );

      await removeFiles(deletedDebt.props.proofs);

      setAlert(
        createAlert(
          'success',
          'Success',
          'The debt record was deleted successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert('error', 'Error', "The debt record couldn't be deleted.")
      );
    }
    setDebtToDelete(undefined);
  };

  const onValidSubmitDebt = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    const results = await uploadFiles(data.proofs);
    const resultsKeys = results.map((result) => result.key);
    const newDebtProps = {
      type: data.otherType ? data.otherType : data.type,
      description: data.description,
      monthlyPayment: Number(data.monthlyPayment),
      unpaidBalance: Number(data.unpaidBalance),
      monthsLeftToPaid: Number(data.monthsLeftToPaid),
      proofs: resultsKeys,
    };
    try {
      if (editingDebt) {
        const original = await DataStore.query(Debt, editingDebt.id);

        const filesToRemove = original.props.proofs.filter(
          (s3key) => !resultsKeys.includes(s3key)
        );

        if (filesToRemove.length > 0) {
          await removeFiles(filesToRemove);
        }

        const persistedDebt = await DataStore.save(
          Debt.copyOf(original, (originalDebt) => {
            originalDebt.props = newDebtProps;
          })
        );
        setDebts((previousDebts) => {
          const editedDebtIndex = previousDebts.findIndex(
            (previousDebt) => previousDebt.id === persistedDebt.id
          );
          if (editedDebtIndex !== -1) {
            previousDebts[editedDebtIndex] = persistedDebt;
          }
          return [...previousDebts];
        });
        setAlert(
          createAlert(
            'success',
            'Success',
            'The debt record was saved successfully.'
          )
        );
      } else {
        const persistedDebt = await DataStore.save(
          new Debt({ ownerId, props: newDebtProps })
        );
        setDebts((previousDebts) => [...previousDebts, persistedDebt]);

        setAlert(
          createAlert(
            'success',
            'Success',
            'The debt record was added successfully.'
          )
        );
      }
      handleOnClickCloseDebtModal();

      updateApplicationLastSection();
    } catch (error) {
      setAlert(
        createAlert('error', 'Error', `The debt record couldn't be saved.`)
      );
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = editingDebt === undefined || edit;

  useEffect(() => {
    setExpanded(false);
  }, [ownerId]);

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [watchType]);

  return (
    <>
      <Modal
        title="Alert"
        open={debtToDelete !== undefined}
        onClickClose={handleOnClickCloseDelete}
      >
        <Text>Are you sure you want to delete this record?</Text>
        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary" onClick={handleOnClickAcceptDelete}>
            Accept
          </Button>
          <Button variation="secondary" onClick={handleOnClickCloseDelete}>
            Cancel
          </Button>
        </Flex>
      </Modal>
      <CustomExpandableCard
        title="Debt records"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>Please add debt records</Text>
          <Button
            height="2rem"
            width="2rem"
            padding="0"
            onClick={handleOnClickAdd}
          >
            <MdAdd size="1.25rem" />
          </Button>
        </Flex>
        <ThemeProvider
          theme={{
            tokens: {
              components: {
                table: {
                  header: {
                    borderColor: 'black',
                  },
                  data: {
                    borderColor: 'black',
                  },
                },
              },
            },
          }}
        >
          <Table variation="small" style={{ wordBreak: 'break-word' }}>
            <TableHead>
              <TableRow>
                <TableCell as="th" width="40%">
                  Name
                </TableCell>
                <TableCell as="th" width="40%">
                  Total
                </TableCell>
                <TableCell as="th" width="20%">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debts.length > 0 ? (
                debts.map((debt) => {
                  const handleOnClickDelete = () => {
                    setDebtToDelete(debt);
                  };

                  const handleOnClickMore = () => {
                    setEditingDebt(debt);
                    const hasOtherType = !debtTypes.includes(debt.props.type);
                    const filesArray = debt.props.proofs.map((fileKey) => {
                      const pathArray = fileKey.split('/');
                      return new File([''], pathArray[pathArray.length - 1]);
                    });

                    reset({
                      ...debt.props,
                      type: hasOtherType ? 'Other' : debt.props.type,
                      otherType: hasOtherType ? debt.props.type : undefined,
                      proofs: filesArray,
                    });
                  };
                  return (
                    <TableRow key={debt.id}>
                      <TableCell>{debt.props.type}</TableCell>
                      <TableCell>{`$${debt.props.monthlyPayment}`}</TableCell>
                      <TableCell>
                        <Flex
                          direction={{ base: 'column', small: 'row' }}
                          width="100%"
                          justifyContent="center"
                          gap="0.5rem"
                        >
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="Delete"
                            onClick={handleOnClickDelete}
                          >
                            <MdClose size="1.25rem" />
                          </Button>
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="Open"
                            onClick={handleOnClickMore}
                          >
                            <MdMoreHoriz size="1.25rem" />
                          </Button>
                        </Flex>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} textAlign="center">
                    No debt record added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ThemeProvider>
        <Modal
          title="Debt"
          open={modal || editingDebt !== undefined}
          onClickClose={handleOnClickCloseDebtModal}
          width={{ large: '35rem', medium: '65%', base: '95%' }}
        >
          <form onSubmit={handleSubmit(onValidSubmitDebt)}>
            <Flex
              direction="column"
              gap="1rem"
              justifyContent="center"
              alignItems="stretch"
            >
              <SelectField
                {...register('type')}
                label="Type of Debt"
                hasError={errors.type !== undefined}
                errorMessage={errors.type?.message}
                isRequired
                isDisabled={!isEnabled}
              >
                {debtTypes.map((debtType) => (
                  <option key={debtType} value={debtType}>
                    {debtType}
                  </option>
                ))}
              </SelectField>
              {watchType === 'Other' && (
                <TextField
                  {...register('otherType')}
                  label="Please describe this type of debt"
                  hasError={errors.otherType !== undefined}
                  errorMessage={errors.otherType?.message}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
              <TextField
                {...register('description')}
                label="Debt description"
                placeholder="Payment of new bought car"
                hasError={errors.description !== undefined}
                errorMessage={errors.description?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <Controller
                control={control}
                name="monthlyPayment"
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newValue) => {
                    onChange(newValue);
                  };
                  return (
                    <CurrencyInput
                      label="Monthly debt payment"
                      placeholder="500"
                      min={0}
                      hasError={errors.monthlyPayment !== undefined}
                      errorMessage={errors.monthlyPayment?.message}
                      isRequired
                      isDisabled={!isEnabled}
                      value={value}
                      onChange={handleOnChange}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="unpaidBalance"
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newValue) => {
                    onChange(newValue);
                  };
                  return (
                    <CurrencyInput
                      label="Unpaid balance"
                      placeholder="10000"
                      min={0}
                      hasError={errors.unpaidBalance !== undefined}
                      errorMessage={errors.unpaidBalance?.message}
                      isRequired
                      isDisabled={!isEnabled}
                      value={value}
                      onChange={handleOnChange}
                    />
                  );
                }}
              />
              <TextField
                {...register('monthsLeftToPaid')}
                label="Months left to paid"
                placeholder="20"
                type="number"
                min={0}
                hasError={errors.monthsLeftToPaid !== undefined}
                errorMessage={errors.monthsLeftToPaid?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <Controller
                control={control}
                name="proofs"
                defaultValue={[]}
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newFiles) => {
                    onChange(newFiles);
                  };
                  return (
                    <FileInput
                      label="Proof of debt"
                      onChange={handleOnChange}
                      isRequired
                      files={value}
                      isDisabled={!isEnabled}
                    />
                  );
                }}
              />
              {loading > 0 && <UploadingFileLoader />}
              <Flex width="100%" justifyContent="end">
                {editingDebt ? (
                  <Button onClick={handleOnClickEdit} variation="secondary">
                    {edit ? 'Cancel' : 'Edit'}
                  </Button>
                ) : null}
                {isEnabled ? (
                  <Button type="submit" variation="primary">
                    Save
                  </Button>
                ) : null}
              </Flex>
            </Flex>
          </form>
        </Modal>
      </CustomExpandableCard>
    </>
  );
};

DebtSection.propTypes = {
  ownerId: PropTypes.string,
  debts: PropTypes.arrayOf(PropTypes.object),
  setDebts: PropTypes.func,
  setAlert: PropTypes.func,
  applicationId: PropTypes.string,
  updateApplicationLastSection: PropTypes.func,
  habitat: PropTypes.object,
};

export default DebtSection;
