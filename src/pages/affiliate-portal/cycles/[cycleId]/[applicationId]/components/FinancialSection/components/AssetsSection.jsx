import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import {
  Button,
  Flex,
  Heading,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import { MdMoreHoriz } from 'react-icons/md';
import CurrencyInput from 'components/CurrencyInput';
import { Storage } from 'aws-amplify';
import { assetsTypes } from 'pages/homeownership/[habitat]/financial/HomeownershipFinancialPage.schema';

const AssetsSection = ({ assets }) => {
  const [modal, setModal] = useState(false);

  const { control, register, reset, unregister, watch } = useForm({
    shouldUnregister: true,
  });

  const watchType = watch('type');

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

  const getDownloadLinks = async (proofs) => {
    let newLinks = [];

    for (const s3key of proofs) {
      const getUrlResult = await Storage.get(s3key, {
        expires: 3600,
        validateObjectExistence: true,
      });
      const fileNameArray = s3key.split('/');
      newLinks = [
        ...newLinks,
        {
          link: getUrlResult,
          fileName: fileNameArray[fileNameArray.length - 1],
        },
      ];
    }

    return newLinks;
  };

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [watchType]);

  return (
    <>
      <Heading level="5">Asset Record List</Heading>
      <Table highlightOnHover style={{ wordBreak: 'break-word' }}>
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
              const handleOnClickMore = async () => {
                const hasOtherType = !assetsTypes.includes(asset.props.type);
                const links = await getDownloadLinks(asset.props.proofs);

                reset({
                  ...asset.props,
                  type: hasOtherType ? 'Other' : asset.props.type,
                  otherType: hasOtherType ? asset.props.type : undefined,
                  proofs: links,
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
              <Flex direction="column" gap="5px" width="100%">
                <Text>Proof of Asset Ownership:</Text>
                <Flex
                  direction="column"
                  gap="0.25rem"
                  maxHeight="7rem"
                  overflow="hidden"
                >
                  <ul style={{ margin: 0 }}>
                    {value.map((fileObject) => (
                      <li key={fileObject.link}>
                        <a
                          href={fileObject.link}
                          style={{ wordBreak: 'break-word' }}
                        >
                          {fileObject.fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Flex>
              </Flex>
            )}
          />
        </Flex>
      </Modal>
    </>
  );
};

AssetsSection.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object),
};

export default AssetsSection;
