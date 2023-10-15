import { FormEvent, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';

import { SubmitFormProps } from './submit-form.props';
import CustomToast from '@/components/custom-toast';
import DragDropInput from '@/components/drag-drop-input';

const SubmitForm = ({ disclosure }: SubmitFormProps) => {
  const { isOpen, onClose, onOpenChange } = disclosure;

  const [file, setFile] = useState<File | undefined>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      setToastText('You need to upload file first!');
      setShowToast(true);
      return;
    }

    const imageData = new FormData();
    imageData.append('xlsx_file', file);
    try {
      await fetch(`https://multipage-table-parser-api.vercel.app/api/upload`, {
        method: 'POST',
        body: imageData,
      });
      setToastText('Your xlsx file successfully uploaded!');
      setShowToast(true);
      onClose();
    } catch (error) {
      false;
      setToastText('Something Went Wrong!');
      setShowToast(true);
    }
  };

  const [showToast, setShowToast] = useState<boolean>(true);
  const [toastText, setToastText] = useState<string>('');

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Submit New File
              </ModalHeader>
              <ModalBody>
                <form id="file-form" onSubmit={handleSubmit}>
                  <DragDropInput setFile={setFile} file={file} />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <input
                  type="submit"
                  form="file-form"
                  value="Upload File"
                  className="flex cursor-pointer items-center justify-center rounded-medium bg-primary px-unit-4 text-white"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
        <CustomToast show={showToast} setShow={setShowToast} text={toastText} />
      </Modal>
    </>
  );
};

export default SubmitForm;
