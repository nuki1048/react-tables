import { useState, useEffect } from 'react';
import { ApplicationStatus, FileWithSize } from '@/global/interfaces';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './home.module.css';
import Spinner from '@/components/spinner';
function HomePage() {
  const [status, setStatus] = useState<ApplicationStatus>(
    ApplicationStatus.Idle
  );
  const [availableFiles, setAvailableFiles] = useState<FileWithSize[]>([]);

  useEffect(() => {
    setStatus(ApplicationStatus.Loading);
    fetch('https://multipage-table-parser-api.vercel.app/api/getListFiles')
      .then((res) => res.json())
      .then((res) => {
        setStatus(ApplicationStatus.Idle);
        setAvailableFiles(res.data);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((_err) => setStatus(ApplicationStatus.Error));
  }, []);

  const getHumanReadableDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className='main'>
      {status === ApplicationStatus.Loading && <Spinner />}
      {status === ApplicationStatus.Error && <div>Error...</div>}
      {status === ApplicationStatus.Idle && (
        <>
          <div className={styles.wrapper}>
            <span className={styles.firstRow}>Name</span>
            <span className={styles.dateRow}>Date</span>
            <span>Size</span>
          </div>
          <ListGroup>
            {availableFiles.map((table) => {
              const name = table.file.split('.');

              return (
                <ListGroup.Item key={table.file} style={{ padding: '0 20px' }}>
                  <Link to={`/editor/${name[0]}`} className={styles.link}>
                    <h3 className={styles.firstRow}>{table.file}</h3>
                    <span className={styles.dateRow}>
                      {getHumanReadableDate(table.createdAt)}
                    </span>

                    <span>{table.size.toFixed(3)}MB</span>
                  </Link>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </>
      )}
    </main>
  );
}

export default HomePage;
