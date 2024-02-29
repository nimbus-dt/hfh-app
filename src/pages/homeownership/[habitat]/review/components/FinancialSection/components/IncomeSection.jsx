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
import { incomeTypes } from 'pages/homeownership/[habitat]/financial/HomeownershipFinancialPage.schema';

const IncomeSection = ({ ownerId, incomes, submitted }) => {
  const [modal, setModal] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const { register, reset, unregister, watch, control } = useForm({
    shouldUnregister: true,
  });

  const watchType = watch('type');

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const handleOnClickCloseIncomeModal = () => {
    reset({
      type: undefined,
      otherType: undefined,
      source: undefined,
      monthlyIncome: undefined,
      proofs: undefined,
    });
    setModal(false);
  };

  useEffect(() => {
    setExpanded(true);
  }, [ownerId]);

  useEffect(() => {
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [watchType]);

  return (
    <CustomExpandableCard
      title="Income records"
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
            {incomes.length > 0 ? (
              incomes.map((income) => {
                const handleOnClickMore = () => {
                  const hasOtherType = !incomeTypes.includes(income.props.type);
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

                  setModal(true);
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
        title="Income"
        open={modal}
        onClickClose={handleOnClickCloseIncomeModal}
        width={{ large: '35rem', medium: '65%', base: '95%' }}
      >
        <Flex
          direction="column"
          gap="1rem"
          justifyContent="center"
          alignItems="stretch"
        >
          <SelectField {...register('type')} label="Type of income" isDisabled>
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
              isDisabled
            />
          )}
          <TextField
            {...register('source')}
            label="Source of income"
            isDisabled
          />
          <Controller
            control={control}
            name="monthlyIncome"
            defaultValue=""
            render={({ field: { value } }) => (
              <CurrencyInput label="Monthly income" value={value} />
            )}
          />
          <Controller
            control={control}
            name="proofs"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <FileInput label="Proof of income" files={value} isDisabled />
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

IncomeSection.propTypes = {
  ownerId: PropTypes.string,
  incomes: PropTypes.arrayOf(PropTypes.object),
  submitted: PropTypes.bool,
};

export default IncomeSection;
