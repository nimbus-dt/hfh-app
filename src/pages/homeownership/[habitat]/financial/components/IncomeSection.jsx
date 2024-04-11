import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataStore, Storage } from 'aws-amplify';
import { Income } from 'models';
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
import {
  incomeSchema,
  incomeTypes,
} from '../HomeownershipFinancialPage.schema';
import UploadingFileLoader from './UploadingFileLoader';

const IncomeSection = ({
  ownerId,
  incomes,
  setIncomes,
  setAlert,
  applicationId,
  updateApplicationLastSection,
  habitat,
}) => {
  const [editingIncome, setEditingIncome] = useState();
  const [incomeToDelete, setIncomeToDelete] = useState();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
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
    resolver: zodResolver(incomeSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickAdd = () => setModal(true);

  const uploadFiles = async (files) => {
    const promisesArr = files.map((file) =>
      Storage.put(
        `financial/${habitat?.urlName}/${applicationId}/${ownerId}/income/${file.name}`,
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

  const handleOnClickCloseIncomeModal = () => {
    reset({
      type: undefined,
      otherType: undefined,
      source: undefined,
      monthlyIncome: undefined,
      proofs: undefined,
    });
    setModal(false);
    setEditingIncome(undefined);
    setEdit(false);
  };

  const handleOnClickCloseDelete = () => setIncomeToDelete(undefined);

  const handleOnClickAcceptDelete = async () => {
    try {
      const original = await DataStore.query(Income, incomeToDelete.id);
      const deletedIncome = await DataStore.delete(original);
      setIncomes((previousIncomes) =>
        previousIncomes.filter(
          (previousIncome) => previousIncome.id !== deletedIncome.id
        )
      );

      await removeFiles(deletedIncome.props.proofs);

      setAlert(
        createAlert(
          'success',
          'Success',
          'The income record was deleted successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert('error', 'Error', "The income record couldn't be deleted.")
      );
    }
    setIncomeToDelete(undefined);
  };

  const onValidSubmitIncome = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    const results = await uploadFiles(data.proofs);
    const resultsKeys = results.map((result) => result.key);
    const newIncomeProps = {
      type: data.otherType ? data.otherType : data.type,
      source: data.source,
      monthlyIncome: Number(data.monthlyIncome),
      proofs: resultsKeys,
    };
    try {
      if (editingIncome) {
        const original = await DataStore.query(Income, editingIncome.id);

        const filesToRemove = original.props.proofs.filter(
          (s3key) => !resultsKeys.includes(s3key)
        );

        if (filesToRemove.length > 0) {
          await removeFiles(filesToRemove);
        }

        const persistedIncome = await DataStore.save(
          Income.copyOf(original, (originalIncome) => {
            originalIncome.props = newIncomeProps;
          })
        );

        setIncomes((previousIncomes) => {
          const editedIncomeIndex = previousIncomes.findIndex(
            (previousIncome) => previousIncome.id === persistedIncome.id
          );
          if (editedIncomeIndex !== -1) {
            previousIncomes[editedIncomeIndex] = persistedIncome;
          }
          return [...previousIncomes];
        });

        setAlert(
          createAlert(
            'success',
            'Success',
            'The income record was saved successfully.'
          )
        );
      } else {
        const persistedIncome = await DataStore.save(
          new Income({ ownerId, props: newIncomeProps })
        );
        setIncomes((previousIncomes) => [...previousIncomes, persistedIncome]);

        setAlert(
          createAlert(
            'success',
            'Success',
            'The income record was added successfully.'
          )
        );
      }
      handleOnClickCloseIncomeModal();

      updateApplicationLastSection();
    } catch (error) {
      setAlert(
        createAlert('error', 'Error', `The income record couldn't be saved.`)
      );
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = editingIncome === undefined || edit;

  useEffect(() => {
    setExpanded(true);
  }, [ownerId]);

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [unregister, watchType]);

  return (
    <>
      <Modal
        title="Alert"
        open={incomeToDelete !== undefined}
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
        title="Income records"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>Please add income records</Text>
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
              {incomes.length > 0 ? (
                incomes.map((income) => {
                  const handleOnClickDelete = () => {
                    setIncomeToDelete(income);
                  };

                  const handleOnClickMore = () => {
                    setEditingIncome(income);
                    const hasOtherType = !incomeTypes.includes(
                      income.props.type
                    );
                    const filesArray = income.props.proofs.map((fileKey) => {
                      const pathArray = fileKey.split('/');
                      return new File([''], pathArray[pathArray.length - 1]);
                    });

                    reset({
                      ...income.props,
                      type: hasOtherType ? 'Other' : income.props.type,
                      otherType: hasOtherType ? income.props.type : undefined,
                      proofs: filesArray,
                    });
                  };
                  return (
                    <TableRow key={income.id}>
                      <TableCell>{income.props.source}</TableCell>
                      <TableCell>{`$${income.props.monthlyIncome}`}</TableCell>
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
                    No income record added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ThemeProvider>
        <Modal
          title="Income"
          open={modal || editingIncome !== undefined}
          onClickClose={handleOnClickCloseIncomeModal}
          width={{ large: '35rem', medium: '65%', base: '95%' }}
        >
          <form onSubmit={handleSubmit(onValidSubmitIncome)}>
            <Flex
              direction="column"
              gap="1rem"
              justifyContent="center"
              alignItems="stretch"
            >
              <SelectField
                {...register('type')}
                label="Type of income"
                hasError={errors.type !== undefined}
                errorMessage={errors.type?.message}
                isRequired
                isDisabled={!isEnabled}
              >
                {incomeTypes.map((incomeType) => (
                  <option key={incomeType} value={incomeType}>
                    {incomeType}
                  </option>
                ))}
              </SelectField>
              {watchType === 'Other' && (
                <TextField
                  {...register('otherType')}
                  label="Please describe this type of income"
                  hasError={errors.otherType !== undefined}
                  errorMessage={errors.otherType?.message}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
              <TextField
                {...register('source')}
                label="Source of income"
                placeholder="McDonalds"
                hasError={errors.source !== undefined}
                errorMessage={errors.source?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <Controller
                control={control}
                name="monthlyIncome"
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newValue) => {
                    onChange(newValue);
                  };
                  return (
                    <CurrencyInput
                      label="Monthly income"
                      placeholder="1000"
                      min={0}
                      hasError={errors.monthlyIncome !== undefined}
                      errorMessage={errors.monthlyIncome?.message}
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
                name="proofs"
                defaultValue={[]}
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newFiles) => {
                    onChange(newFiles);
                  };
                  return (
                    <FileInput
                      label="Proof of income"
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
                {editingIncome ? (
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

IncomeSection.propTypes = {
  ownerId: PropTypes.string,
  incomes: PropTypes.arrayOf(PropTypes.object),
  setIncomes: PropTypes.func,
  setAlert: PropTypes.func,
  applicationId: PropTypes.string,
  updateApplicationLastSection: PropTypes.func,
  habitat: PropTypes.object,
};

export default IncomeSection;
