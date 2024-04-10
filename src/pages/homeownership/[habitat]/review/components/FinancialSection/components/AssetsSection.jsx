import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  TextField,
  ThemeProvider,
} from '@aws-amplify/ui-react';
import { MdMoreHoriz } from 'react-icons/md';
import FileInput from 'components/FileInput';
import CurrencyInput from 'components/CurrencyInput';
import { Link } from 'react-router-dom';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { assetsTypes } from 'pages/homeownership/[habitat]/financial/HomeownershipFinancialPage.schema';

const AssetsSection = ({ ownerId, assets, submitted }) => {
  const [modal, setModal] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const { control, register, reset, unregister, watch } = useForm();

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickCloseAssetModal = () => {
    reset({
      type: undefined,
      otherType: undefined,
      heldByOrLocation: undefined,
      currentValue: undefined,
      proofs: undefined,
    });
    setModal(false);
  };

  useEffect(() => {
    setExpanded(false);
  }, [ownerId]);

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [unregister, watchType]);

  return (
    <CustomExpandableCard
      title="Asset records"
      expanded={expanded}
      onExpandedChange={handleOnExpandedChange}
      width="100%"
    >
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
                const handleOnClickMore = () => {
                  const hasOtherType = !assetsTypes.includes(asset.props.type);
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

                  setModal(true);
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
        <br />
        {!submitted && (
          <Flex width="100%" justifyContent="end">
            <Link to="../financial">
              <Button variation="primary">Edit</Button>
            </Link>
          </Flex>
        )}
      </ThemeProvider>
      <Modal
        title="Asset"
        open={modal}
        onClickClose={handleOnClickCloseAssetModal}
        width={{ large: '35rem', medium: '65%', base: '95%' }}
      >
        <Flex
          direction="column"
          gap="1rem"
          justifyContent="center"
          alignItems="stretch"
        >
          <SelectField {...register('type')} label="Type of Asset" isDisabled>
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
              isDisabled
            />
          )}
          <TextField
            {...register('heldByOrLocation')}
            label="Name of institution where asset is held / Asset Location"
            isDisabled
          />
          <Controller
            control={control}
            name="currentValue"
            defaultValue=""
            render={({ field: { value } }) => (
              <CurrencyInput
                label="Current asset value"
                isDisabled
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="proofs"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <FileInput
                label="Proof of asset ownership"
                files={value}
                isDisabled
              />
            )}
          />
          {!submitted && (
            <Flex width="100%" justifyContent="end">
              <Link to="../financial">
                <Button variation="primary">Edit</Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Modal>
    </CustomExpandableCard>
  );
};

AssetsSection.propTypes = {
  ownerId: PropTypes.string,
  assets: PropTypes.arrayOf(PropTypes.object),
  submitted: PropTypes.bool,
};

export default AssetsSection;
