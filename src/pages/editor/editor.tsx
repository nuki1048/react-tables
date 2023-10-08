import { useEffect, useState } from 'react';

import { ApplicationStatus, ExternalTable } from '@/global/interfaces';
import Table from '@/components/table';
import { useParams } from 'react-router-dom';

function EditorPage() {
  const [exampleSheet, setExampleSheet] = useState<ExternalTable>();
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.Idle
  );
  const { tableName } = useParams<string>();

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
    if (tableName) {
      fetchData(tableName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName]);
  console.log(exampleSheet);

  return (
    <main className='main'>
      {exampleSheet && (
        <Table table={exampleSheet as ExternalTable} status={status} />
      )}
    </main>
  );
}

export default EditorPage;
