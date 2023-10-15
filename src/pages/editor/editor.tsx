import { useEffect, useState } from 'react';

import { ApplicationStatus, ExternalTable } from '@/global/interfaces';
import Table from '@/components/table';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';

const SkeletonEditorPage = (): JSX.Element => {
  const array = Array(6).fill(0);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-16 gap-3">
        <Skeleton className="h-full w-1/6 rounded-lg" />
        <Skeleton className="h-full w-1/6 rounded-lg" />
        <Skeleton className="h-full w-2/6 rounded-lg" />
        <Skeleton className="h-full w-1/6 rounded-lg" />
        <Skeleton className="h-full w-1/6 rounded-lg" />
        <Skeleton className="h-full w-1/6 rounded-lg" />
      </div>
      {array.map(() => {
        return (
          <div className="flex h-12 gap-3">
            <Skeleton className="h-full w-1/6 rounded-lg" />
            <Skeleton className="h-full w-1/6 rounded-lg" />
            <Skeleton className="h-full w-2/6 rounded-lg" />
            <Skeleton className="h-full w-1/6 rounded-lg" />
            <Skeleton className="h-full w-1/6 rounded-lg" />
            <Skeleton className="h-full w-1/6 rounded-lg" />
          </div>
        );
      })}
    </div>
  );
};

function EditorPage() {
  const [exampleSheet, setExampleSheet] = useState<ExternalTable>();
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.Idle,
  );
  const { tableName } = useParams<string>();

  const fetchData = async (filename: string) => {
    setStatus(ApplicationStatus.Loading);
    try {
      const response = await fetch(
        `https://multipage-table-parser-oafp5shmi-nuki1048.vercel.app/api/table/${filename}`,
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

  return (
    <>
      {exampleSheet && (
        <Table table={exampleSheet as ExternalTable} status={status} />
      )}
      {!exampleSheet && <SkeletonEditorPage />}
    </>
  );
}

export default EditorPage;
