import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import SubmitForm from '@/components/submit-form';

const AppNavbar = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Navbar
      expand='lg'
      className='background-red p-3 position-fixed top-0 w-100'
    >
      <Navbar.Brand href='/' className='color-white-logo'>
        Simple Table Parser📚📅
      </Navbar.Brand>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link
            href='#'
            onClick={() => setShowForm(true)}
            className='color-white'
          >
            Add new table
          </Nav.Link>
          <Nav.Link href='#' className='color-white'>
            Link
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <SubmitForm showForm={showForm} setShowForm={setShowForm} />
    </Navbar>
  );
};

export default AppNavbar;
