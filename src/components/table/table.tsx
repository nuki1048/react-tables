/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { TableRow } from '../../global/interfaces';
import { TableProps } from './table.props';
import Tabs from '@/components/tabs';
import {
  Table as TableUI,
  TableCell,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow as TableRowUI,
  getKeyValue,
} from '@nextui-org/react';

const Table = ({ table }: TableProps) => {
  const [tablePages, setTablePages] = useState<
    { key: string; title: string }[]
  >([]);
  const [activePage, setActivePage] = useState<string>('');
  const [activePageKeys, setActivePageKeys] = useState<string[]>([]);
  const [activePageData, setActivePageData] = useState<TableRow | null>(null);
  useEffect(() => {
    if (table) {
      const tableKeys = Object.keys(table.data);
      const obj = tableKeys.map((item) => ({ key: item, title: item }));
      setTablePages(obj);
      onChangeActivePage(tableKeys[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const onChangeActivePage = (newActivePage: string): void => {
    setActivePage(newActivePage);
    setActivePageKeys(table.keys[newActivePage]);
    setActivePageData(table.data[newActivePage]);
  };

  return (
    <div className="flex w-full flex-col">
      {table && activePageData && (
        <TableUI
          removeWrapper
          fullWidth
          selectionMode="single"
          defaultSelectedKeys={['2']}
          aria-label="Example static collection table"
        >
          <TableHeader>
            {activePageKeys.map((name) => (
              <TableColumn key={name}>{name}</TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent={'No rows to display.'}
            items={activePageData}
          >
            {table && activePageData
              ? activePageData.map((row, index) => {
                  return (
                    <TableRowUI key={`${index + 1}`}>
                      {(columnKey) => (
                        <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                      )}
                    </TableRowUI>
                  );
                })
              : []}
          </TableBody>
        </TableUI>
      )}
      <Tabs
        activePage={activePage}
        tablePages={tablePages}
        onChangeActivePage={onChangeActivePage}
      />
    </div>
  );
};

export default Table;
