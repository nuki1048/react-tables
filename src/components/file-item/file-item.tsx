import { Link } from 'react-router-dom';
import { FileItemProps } from './file-item.props';

const FileItem: React.FC<FileItemProps> = ({ file, link }) => {
  const getHumanReadableDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <li className="px-5">
      <Link
        to={link}
        className="flex items-center rounded-2xl px-8 py-2 transition-colors hover:bg-primary hover:text-white light:text-foreground dark:text-white"
      >
        <h5 className="w-[40%] text-left">{file.file}</h5>
        <span className="ml-80 mr-auto">
          {getHumanReadableDate(file.createdAt)}
        </span>

        <span>{file.size.toFixed(3)}MB</span>
      </Link>
    </li>
  );
};
export default FileItem;
