import { Toast, ToastContainer } from 'react-bootstrap';
import { CustomToastProps } from './custom-toast.props';

function CustomToast({ setShow, show, text }: CustomToastProps) {
  return (
    <ToastContainer position='bottom-end'>
      <Toast
        bg='dark'
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
          <strong className='me-auto text-gray'>API</strong>
          <small className='text-white'>1 sec ago</small>
        </Toast.Header>
        <Toast.Body className='text-white'>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;
