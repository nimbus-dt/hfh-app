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
import { incomeTypes } from 'components/Test/Parts/TestFinancial/TestFinancial.schema';
import { Storage } from 'aws-amplify';

const IncomeSection = ({ incomes }) => {
  const [modal, setModal] = useState(false);

  const { register, reset, unregister, watch, control } = useForm();

  const watchType = watch('type');

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
    if (watchType !== 'Other') {
      unregister('otherType');
    }
  }, [watchType]);

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

  return (
    <>
      <Heading level="5">Income Record List</Heading>
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
          {incomes.length > 0 ? (
            incomes.map((income) => {
              const handleOnClickMore = async () => {
                const hasOtherType = !incomeTypes.includes(income.props.type);

                const links = await getDownloadLinks(income.props.proofs);

                reset({
                  ...income.props,
                  type: hasOtherType ? 'Other' : income.props.type,
                  otherType: hasOtherType ? income.props.type : undefined,
                  proofs: links,
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
              <CurrencyInput label="Monthly income" value={value} isDisabled />
            )}
          />
          <Controller
            control={control}
            name="proofs"
            defaultValue={[]}
            render={({ field: { value } }) => (
              <Flex direction="column" gap="5px" width="100%">
                <Text>Proof of Income:</Text>
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

IncomeSection.propTypes = {
  incomes: PropTypes.arrayOf(PropTypes.object),
};

export default IncomeSection;
