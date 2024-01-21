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
import { debtTypes } from 'components/Test/Parts/TestFinancial/TestFinancial.schema';
import { Storage } from 'aws-amplify';

const DebtSection = ({ debts }) => {
  const [modal, setModal] = useState(false);

  const { control, register, reset, unregister, watch } = useForm();

  const watchType = watch('type');

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
      <Heading level="5" textAlign="center">
        Debt Record List
      </Heading>
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
              const handleOnClickMore = async () => {
                const hasOtherType = !debtTypes.includes(debt.props.type);
                const links = await getDownloadLinks(debt.props.proofs);

                reset({
                  ...debt.props,
                  type: hasOtherType ? 'Other' : debt.props.type,
                  otherType: hasOtherType ? debt.props.type : undefined,
                  proofs: links,
                });

                setModal(true);
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
      <Modal
        title="Debt"
        open={modal}
        onClickClose={handleOnClickCloseDebtModal}
        width={{ large: '35rem', medium: '65%', base: '95%' }}
      >
        <Flex
          direction="column"
          gap="1rem"
          justifyContent="center"
          alignItems="stretch"
        >
          <SelectField {...register('type')} label="Type of Debt" isDisabled>
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
              isDisabled
            />
          )}
          <TextField
            {...register('description')}
            label="Debt description"
            isDisabled
          />
          <Controller
            control={control}
            name="monthlyPayment"
            defaultValue=""
            render={({ field: { value } }) => (
              <CurrencyInput
                label="Monthly debt payment"
                isDisabled
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="unpaidBalance"
            defaultValue=""
            render={({ field: { value } }) => (
              <CurrencyInput label="Unpaid balance" isDisabled value={value} />
            )}
          />
          <TextField
            {...register('monthsLeftToPaid')}
            label="Months left to paid"
            type="number"
            isDisabled
          />
          <Controller
            control={control}
            name="proofs"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <Flex direction="column" gap="5px" width="100%">
                <Text>Proof of Debt:</Text>
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

DebtSection.propTypes = {
  debts: PropTypes.arrayOf(PropTypes.object),
};

export default DebtSection;
