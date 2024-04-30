import {
  Flex,
  ScrollView,
  SelectField,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableFoot,
  TableHead,
  TableRow,
  Text,
} from '@aws-amplify/ui-react';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import style from './TableWithPaginator.module.css';
import Paginator from './components/Paginator';
import { TPerPage } from './components/Paginator/Paginator';

interface ICell {
  value: ReactNode;
  id: string | number;
  colSpan?: string | number;
  textAlign?: TableCellProps['textAlign'];
  minWidth?: TableCellProps['minWidth'];
  width?: TableCellProps['width'];
  maxWidth?: TableCellProps['maxWidth'];
}

interface IData {
  cells: ICell[];
  id: string | number;
}

interface IProperties {
  headers: ICell[];
  data: IData[];
  hasMoreData?: boolean;
  loadMoreData?: () => void;
}

const TableWithPaginator = ({
  headers,
  data,
  hasMoreData,
  loadMoreData,
}: IProperties) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<TPerPage>(10);

  const pageData = useMemo(
    () => data.slice((currentPage - 1) * perPage, currentPage * perPage),
    [currentPage, data, perPage]
  );

  const totalPages = useMemo(
    () => Math.ceil(data.length / perPage),
    [data.length, perPage]
  );

  useEffect(() => {
    if (currentPage === totalPages && loadMoreData) {
      loadMoreData();
    }
  }, [currentPage, loadMoreData, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, data.length, perPage, totalPages]);

  return (
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
                minWidth={header.minWidth}
                width={header.width}
                maxWidth={header.maxWidth}
              >
                {header.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pageData.map((dataItem) => (
            <TableRow key={dataItem.id}>
              {dataItem.cells.map((cell) => (
                <TableCell
                  colSpan={cell.colSpan as unknown as number}
                  key={cell.id}
                  textAlign={cell.textAlign}
                  minWidth={cell.minWidth}
                  width={cell.width}
                  maxWidth={cell.maxWidth}
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
              <Flex justifyContent="end" alignItems="center" padding="0">
                <Text color="var(--amplify-colors-neutral-90)">
                  Rows per page
                </Text>
                <SelectField
                  value={`${perPage}`}
                  onChange={(event) => {
                    const newPerPage = Number(event.currentTarget.value);
                    if (
                      newPerPage === 5 ||
                      newPerPage === 10 ||
                      newPerPage === 15
                    ) {
                      setPerPage(newPerPage);
                    }
                  }}
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
                  current={currentPage}
                  total={totalPages}
                  onChange={(newPage) => setCurrentPage(newPage)}
                  hasMore={hasMoreData}
                />
              </Flex>
            </TableCell>
          </TableRow>
        </TableFoot>
      </Table>
    </ScrollView>
  );
};

export default TableWithPaginator;
