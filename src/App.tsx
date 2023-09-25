import { useEffect, useState } from 'react';

import Table from './components/table/table';
import { ApplicationStatus, ExternalTable } from './interfaces/interfaces';
import AppNavbar from './components/navbar/navbar';
import { useXlsx } from './hooks/useXlsx';
function App() {
  const [exampleSheet, setExampleSheet] = useState<ExternalTable>();
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.Idle
  );
  const { activeFile } = useXlsx();

  const fetchData = async (filename: string) => {
    setStatus(ApplicationStatus.Loading);
    try {
      const response = await fetch(
        `https://multipage-table-parser-api.vercel.app/api/getTable/${filename}`
      );
      const json = await response.json();
      setExampleSheet(json);
      setStatus(ApplicationStatus.Idle);
    } catch (error) {
      setStatus(ApplicationStatus.Error);
    }
  };

  useEffect(() => {
    fetchData(activeFile);
  }, [activeFile]);

  return (
    <main className='main'>
      <AppNavbar />
      <Table table={exampleSheet as ExternalTable} status={status} />
    </main>
  );
}

export default App;
