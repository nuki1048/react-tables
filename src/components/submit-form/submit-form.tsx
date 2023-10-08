import { FormEvent, useRef, useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { SubmitFormProps } from './submit-form.props';
import CustomToast from '@/components/custom-toast';

const SubmitForm = ({ setShowForm, showForm }: SubmitFormProps) => {
  const inputRef = useRef(null);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const inputValue = inputRef.current as HTMLInputElement | null;
    if (!inputValue?.files) return;
    const file = inputValue?.files[0];

    const imageData = new FormData();
    imageData.append('xlsx_file', file);
    try {
      await fetch(`https://multipage-table-parser-api.vercel.app/api/upload`, {
        method: 'POST',
        body: imageData,
      });
      setShowForm(false);
      setToastText('Your xlsx file successfully uploaded!');
      setShowToast(true);
    } catch (error) {
      setShowForm(false);
      setToastText('Something Went Wrong!');
      setShowToast(true);
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const handleClose = () => setShowForm(false);

  return (
    <>
      <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className='mb-3'>
              <Form.Control type='file' accept='.xlsx, .xls' ref={inputRef} />
            </InputGroup>

            <Button variant='primary' type='submit' size='lg'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <CustomToast show={showToast} setShow={setShowToast} text={toastText} />
    </>
  );
};

export default SubmitForm;
