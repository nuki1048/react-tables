import { useContext } from 'react';
import { XlsxContext } from '../context/xlsxContext';

export const useXlsx = () => {
  const context = useContext(XlsxContext);

  if (context === undefined) {
    throw new Error(
      'Before use hook you need to wrap application with context.'
    );
  }
  return context;
};
