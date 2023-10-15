import { DragEvent, FormEvent, useState } from 'react';
import { DragDropInputProps } from './drag-drop-input.props';
const ALLOWED_FILE_TYPE = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

enum InputErrors {
  Unsupported = 'Unsupported file type! Please use a file with the XLSX extension.',
}

const DragDropInput: React.FC<DragDropInputProps> = ({ setFile, file }) => {
  const [isOver, setIsOver] = useState<boolean>(false);
  const [error, setError] = useState<InputErrors | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    setError(null);

    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    setError(null);
    event.preventDefault();
    setIsOver(false);

    const droppedFiles = event.dataTransfer.files[0];
    if (!checkAllowedFiles(droppedFiles)) {
      return setError(InputErrors.Unsupported);
    }
    setFile(droppedFiles);
  };

  const checkAllowedFiles = (file: globalThis.File) => {
    const isAllowed = ALLOWED_FILE_TYPE.includes(file.type);

    return isAllowed;
  };

  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    setError(null);

    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const file = target.files[0];
    if (!checkAllowedFiles(file)) {
      return setError(InputErrors.Unsupported);
    }
    setFile(file);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-2 rounded-md border border-dashed	p-2 ${
        isOver || error ? 'border-danger' : 'border-gray-200'
      }`}
    >
      {error && <span className="text-danger">{error}</span>}
      {!error && (
        <>
          <span>Drag and drop some files here</span>
          <span>OR</span>
          <label className="text-center hover:underline">
            Click here to open Explorer
            <input
              type="file"
              accept=".xlsx"
              onChange={handleOnChange}
              className="opacity-0"
            />
          </label>
        </>
      )}
      {!error && file && <span>{file.name}</span>}
    </div>
  );
};

export default DragDropInput;
