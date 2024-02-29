import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataStore, Storage } from 'aws-amplify';
import { Asset } from 'models';
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
  assetsSchema,
  assetsTypes,
} from '../HomeownershipFinancialPage.schema';
import UploadingFileLoader from './UploadingFileLoader';

const AssetsSection = ({
  ownerId,
  assets,
  setAssets,
  setAlert,
  applicationId,
  updateApplicationLastSection,
  habitat,
}) => {
  const [editingAsset, setEditingAsset] = useState();
  const [assetToDelete, setAssetToDelete] = useState();
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
    resolver: zodResolver(assetsSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    shouldUnregister: true,
  });

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickAdd = () => setModal(true);

  const uploadFiles = async (files) => {
    const promisesArr = files.map((file) =>
      Storage.put(
        `financial/${habitat?.urlName}/${applicationId}/${ownerId}/asset/${file.name}`,
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

  const handleOnClickCloseAssetModal = () => {
    reset({
      type: undefined,
      otherType: undefined,
      heldByOrLocation: undefined,
      currentValue: undefined,
      proofs: undefined,
    });
    setModal(false);
    setEditingAsset(undefined);
    setEdit(false);
  };

  const handleOnClickCloseDelete = () => setAssetToDelete(undefined);

  const handleOnClickAcceptDelete = async () => {
    try {
      const original = await DataStore.query(Asset, assetToDelete.id);
      const deletedAsset = await DataStore.delete(original);
      setAssets((previousAssets) =>
        previousAssets.filter(
          (previousAsset) => previousAsset.id !== deletedAsset.id
        )
      );

      await removeFiles(deletedAsset.props.proofs);

      setAlert(
        createAlert(
          'success',
          'Success',
          'The asset record was deleted successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert('error', 'Error', "The asset record couldn't be deleted.")
      );
    }
    setAssetToDelete(undefined);
  };

  const onValidSubmitAsset = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    const results = await uploadFiles(data.proofs);
    const resultsKeys = results.map((result) => result.key);
    const newAssetProps = {
      type: data.otherType ? data.otherType : data.type,
      heldByOrLocation: data.heldByOrLocation,
      currentValue: Number(data.currentValue),
      proofs: resultsKeys,
    };
    try {
      if (editingAsset) {
        const original = await DataStore.query(Asset, editingAsset.id);

        const filesToRemove = original.props.proofs.filter(
          (s3key) => !resultsKeys.includes(s3key)
        );

        if (filesToRemove.length > 0) {
          await removeFiles(filesToRemove);
        }

        const persistedAsset = await DataStore.save(
          Asset.copyOf(original, (originalAsset) => {
            originalAsset.props = newAssetProps;
          })
        );
        setAssets((previousAssets) => {
          const editedAssetIndex = previousAssets.findIndex(
            (previousAsset) => previousAsset.id === persistedAsset.id
          );
          if (editedAssetIndex !== -1) {
            previousAssets[editedAssetIndex] = persistedAsset;
          }
          return [...previousAssets];
        });
        setAlert(
          createAlert(
            'success',
            'Success',
            'The asset record was saved successfully.'
          )
        );
      } else {
        const persistedAsset = await DataStore.save(
          new Asset({ ownerId, props: newAssetProps })
        );
        setAssets((previousAssets) => [...previousAssets, persistedAsset]);

        setAlert(
          createAlert(
            'success',
            'Success',
            'The asset record was added successfully.'
          )
        );
      }
      handleOnClickCloseAssetModal();

      updateApplicationLastSection();
    } catch (error) {
      setAlert(
        createAlert('error', 'Error', `The asset record couldn't be saved.`)
      );
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = editingAsset === undefined || edit;

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
        open={assetToDelete !== undefined}
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
        title="Asset records"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>Please add asset records</Text>
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
              {assets.length > 0 ? (
                assets.map((asset) => {
                  const handleOnClickDelete = () => {
                    setAssetToDelete(asset);
                  };

                  const handleOnClickMore = () => {
                    setEditingAsset(asset);
                    const hasOtherType = !assetsTypes.includes(
                      asset.props.type
                    );
                    const filesArray = asset.props.proofs.map((fileKey) => {
                      const pathArray = fileKey.split('/');
                      return new File([''], pathArray[pathArray.length - 1]);
                    });

                    reset({
                      ...asset.props,
                      type: hasOtherType ? 'Other' : asset.props.type,
                      otherType: hasOtherType ? asset.props.type : undefined,
                      proofs: filesArray,
                    });
                  };
                  return (
                    <TableRow key={asset.id}>
                      <TableCell>{asset.props.type}</TableCell>
                      <TableCell>{`$${asset.props.currentValue}`}</TableCell>
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
                    No asset record added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ThemeProvider>
        <Modal
          title="Asset"
          open={modal || editingAsset !== undefined}
          onClickClose={handleOnClickCloseAssetModal}
          width={{ large: '35rem', medium: '65%', base: '95%' }}
        >
          <form onSubmit={handleSubmit(onValidSubmitAsset)}>
            <Flex
              direction="column"
              gap="1rem"
              justifyContent="center"
              alignItems="stretch"
            >
              <SelectField
                {...register('type')}
                label="Type of Asset"
                hasError={errors.type !== undefined}
                errorMessage={errors.type?.message}
                isRequired
                isDisabled={!isEnabled}
              >
                {assetsTypes.map((assetType) => (
                  <option key={assetType} value={assetType}>
                    {assetType}
                  </option>
                ))}
              </SelectField>
              {watchType === 'Other' && (
                <TextField
                  {...register('otherType')}
                  label="Please describe this type of asset"
                  hasError={errors.otherType !== undefined}
                  errorMessage={errors.otherType?.message}
                  isRequired
                  isDisabled={!isEnabled}
                />
              )}
              <TextField
                {...register('heldByOrLocation')}
                label="Name of institution where asset is held / Asset Location"
                placeholder="Bank of America"
                hasError={errors.heldByOrLocation !== undefined}
                errorMessage={errors.heldByOrLocation?.message}
                isRequired
                isDisabled={!isEnabled}
              />
              <Controller
                control={control}
                name="currentValue"
                defaultValue=""
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newValue) => {
                    onChange(newValue);
                  };
                  return (
                    <CurrencyInput
                      label="Current asset value"
                      placeholder="5000"
                      min={0}
                      hasError={errors.currentValue !== undefined}
                      errorMessage={errors.currentValue?.message}
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
                      label="Proof of asset ownership"
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
                {editingAsset ? (
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

AssetsSection.propTypes = {
  ownerId: PropTypes.string,
  assets: PropTypes.arrayOf(PropTypes.object),
  setAssets: PropTypes.func,
  setAlert: PropTypes.func,
  applicationId: PropTypes.string,
  updateApplicationLastSection: PropTypes.func,
  habitat: PropTypes.object,
};

export default AssetsSection;
