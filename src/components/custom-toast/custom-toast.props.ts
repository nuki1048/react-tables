import { Dispatch, SetStateAction } from 'react';

export interface CustomToastProps {
  text: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
