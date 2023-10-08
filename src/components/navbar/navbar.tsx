import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import SubmitForm from '@/components/submit-form';

const AppNavbar = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary p-3 position-fixed top-0 w-100'
    >
      <Navbar.Brand href='/'>Simple Table Parser📚📅</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' onClick={() => setShowForm(true)}>
            Add new table
          </Nav.Link>
          <Nav.Link href='#'>Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <SubmitForm showForm={showForm} setShowForm={setShowForm} />
    </Navbar>
  );
};

export default AppNavbar;
