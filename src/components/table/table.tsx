/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { ApplicationStatus, TableRow } from '../../global/interfaces';
import { TableProps } from './table.props';
import { Table as TableBootstrap } from 'react-bootstrap';
import Spinner from '@/components/spinner';
import Tabs from '@/components/tabs';

const Table = ({ table, status }: TableProps) => {
  const [tablePages, setTablePages] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string>('');
  const [activePageKeys, setActivePageKeys] = useState<string[]>([]);
  const [activePageData, setActivePageData] = useState<TableRow | null>(null);
  useEffect(() => {
    if (table) {
      const tableKeys = Object.keys(table.data);
      setTablePages(tableKeys);
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
    <>
      <TableBootstrap striped bordered style={{ minHeight: 500 }}>
        {status === ApplicationStatus.Loading && <Spinner />}
        {status === ApplicationStatus.Error && <div>Error...</div>}
        {status === ApplicationStatus.Idle && (
          <>
            <thead>
              {table && activePageKeys && (
                <tr>
                  {activePageKeys.map((item) => {
                    return <th key={item}>{item}</th>;
                  })}
                </tr>
              )}
            </thead>
            <tbody>
              {table &&
                activePageData &&
                activePageData.map(
                  (page: { [key: string]: any }, index: number) => (
                    <tr key={`page-${index}`}>
                      {Object.keys(page).map((item) => (
                        <td className='table-td' key={`${item}-${page[item]}`}>
                          {page[item]}
                        </td>
                      ))}
                    </tr>
                  )
                )}
            </tbody>
          </>
        )}
      </TableBootstrap>
      <Tabs
        activePage={activePage}
        onChangeActivePage={onChangeActivePage}
        tablePages={tablePages}
      />
    </>
  );
};

export default Table;
