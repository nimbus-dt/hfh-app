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
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import { MdMoreHoriz } from 'react-icons/md';
import FileInput from 'components/FileInput';
import CurrencyInput from 'components/CurrencyInput';
import { debtTypes } from 'components/Test/Parts/TestFinancial/TestFinancial.schema';
import { Link } from 'react-router-dom';

const DebtSection = ({ ownerId, debts }) => {
  const [modal, setModal] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const { control, register, reset, unregister, watch } = useForm();

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

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

  useEffect(() => {
    setExpanded(false);
  }, [ownerId]);

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [watchType]);

  return (
    <CustomExpandableCard
      title="Debt records"
      expanded={expanded}
      onExpandedChange={handleOnExpandedChange}
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
            {debts.length > 0 ? (
              debts.map((debt) => {
                const handleOnClickMore = () => {
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
        <br />
        <Flex width="100%" justifyContent="end">
          <Link to="../financial">
            <Button variation="primary">Edit</Button>
          </Link>
        </Flex>
      </ThemeProvider>
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
              <FileInput label="Proof of debt" files={value} isDisabled />
            )}
          />
          <Flex width="100%" justifyContent="end">
            <Link to="../financial">
              <Button variation="primary">Edit</Button>
            </Link>
          </Flex>
        </Flex>
      </Modal>
    </CustomExpandableCard>
  );
};

DebtSection.propTypes = {
  ownerId: PropTypes.string,
  debts: PropTypes.arrayOf(PropTypes.object),
};

export default DebtSection;
