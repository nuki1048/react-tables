import { createContext, useState } from 'react';

interface XlsxContextValues {
  activeFile: string;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
}

export const XlsxContext = createContext<XlsxContextValues>({
  activeFile: '', // set a default value
  setActiveFile: () => {},
});

interface XlsxProps {
  children: React.ReactNode;
}

const XlsxContextWrapper = ({ children }: XlsxProps): JSX.Element => {
  const [activeFile, setActiveFile] = useState('sample_data.xlsx');

  return (
    <XlsxContext.Provider value={{ activeFile, setActiveFile }}>
      {children}
    </XlsxContext.Provider>
  );
};
export default XlsxContextWrapper;
