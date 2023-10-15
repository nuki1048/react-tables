import { useState, useEffect } from 'react';
import { ApplicationStatus, FileWithSize } from '@/global/interfaces';
import { Skeleton } from '@nextui-org/react';
import FileItem from '@/components/file-item/file-item';

const skeletonStyles = 'flex w-full h-16 rounded-lg';

const SkeletonHomePage = () => (
  <ul className="flex w-full flex-col gap-3">
    <Skeleton className={skeletonStyles} />
    <Skeleton className={skeletonStyles} />
    <Skeleton className={skeletonStyles} />
    <Skeleton className={skeletonStyles} />
    <Skeleton className={skeletonStyles} />
  </ul>
);

function HomePage() {
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.Idle,
  );
  const [availableFiles, setAvailableFiles] = useState<FileWithSize[]>([]);

  useEffect(() => {
    setStatus(ApplicationStatus.Loading);
    fetch(
      'https://multipage-table-parser-oafp5shmi-nuki1048.vercel.app/api/files',
    )
      .then((res) => res.json())
      .then((res) => {
        setStatus(ApplicationStatus.Idle);
        setAvailableFiles(res.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_err) => setStatus(ApplicationStatus.Error));
  }, []);

  return (
    <main className="w-full">
      <div className="flex items-center justify-between px-14">
        <span className="w-[40%] text-left">Name</span>
        <span className="ml-80 mr-auto">Date</span>
        <span>Size</span>
      </div>
      {status === ApplicationStatus.Loading && <SkeletonHomePage />}
      {status === ApplicationStatus.Error && <div>Error...</div>}
      {status === ApplicationStatus.Idle && (
        <>
          <ul className="mt-3 flex flex-col gap-3 overflow-auto">
            {availableFiles.map((file) => {
              const name = file.file.split('.');

              return (
                <FileItem
                  file={file}
                  link={`/editor/${name[0]}`}
                  key={`file-id-${file}`}
                />
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}

export default HomePage;
