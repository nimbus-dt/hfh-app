import {
  Flex,
  ScrollView,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableRow,
  Text,
} from '@aws-amplify/ui-react';
import React, { ReactNode } from 'react';
import style from './TableWithPaginator.module.css';
import Paginator from './components/Paginator';

interface ICell {
  value: ReactNode;
  id: string | number;
  colSpan?: string | number;
  textAlign?: 'center' | 'left' | 'right' | 'justify';
}

interface IData {
  cells: ICell[];
  id: string | number;
}

interface IProperties {
  headers: ICell[];
  data: IData[];
}

const TableWithPaginator = ({ headers, data }: IProperties) => (
  <ScrollView width="100%" className={`${style.container}`}>
    <Table className={`${style.table} theme-body-medium`}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell
              as="th"
              key={header.id}
              textAlign={header.textAlign}
              colSpan={header.colSpan as unknown as number}
            >
              {header.value}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((dataItem) => (
          <TableRow key={dataItem.id}>
            {dataItem.cells.map((cell) => (
              <TableCell
                colSpan={cell.colSpan as unknown as number}
                key={cell.id}
                textAlign={cell.textAlign}
              >
                {cell.value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell colSpan={'100%' as unknown as number}>
            <Flex justifyContent="end" alignItems="center" padding="12px 16px">
              <Text color="var(--amplify-colors-neutral-90)">
                Rows per page
              </Text>
              <SelectField
                label=""
                labelHidden
                padding="4px 16px"
                minWidth="108px"
                lineHeight="var(--amplify-line-heights-small)"
                className={`${style.select}`}
                style={{
                  paddingBlock: 'unset',
                }}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </SelectField>
              <Paginator
                current={1}
                total={5}
                onChange={(newPage) => console.log(newPage)}
              />
            </Flex>
          </TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  </ScrollView>
);

export default TableWithPaginator;
