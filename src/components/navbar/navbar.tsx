import { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import SubmitForm from '../submit-form/submit-form';
import { useXlsx } from '../../hooks/useXlsx';

const AppNavbar = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const { activeFile, setActiveFile } = useXlsx();

  const [availableFiles, setAvailableFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://multipage-table-parser-api.vercel.app/api/getListFiles')
      .then((res) => res.json())
      .then((res) => setAvailableFiles(res.data));
  }, []);

  const handleSelect = (eventKey: string | null) =>
    eventKey ? setActiveFile(eventKey) : null;

  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary p-3 position-fixed top-0 w-100'
    >
      <Navbar.Brand href='#'>Simple Table Parser📚📅</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' onClick={() => setShowForm(true)}>
            Add new table
          </Nav.Link>
          <Nav.Link href='#'>Link</Nav.Link>
          <NavDropdown
            title='Select Table'
            id='basic-nav-dropdown'
            onSelect={handleSelect}
          >
            {availableFiles &&
              availableFiles.map((item) => (
                <NavDropdown.Item
                  href='#'
                  key={item}
                  eventKey={item}
                  active={activeFile === item}
                >
                  {item}
                </NavDropdown.Item>
              ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <SubmitForm showForm={showForm} setShowForm={setShowForm} />
    </Navbar>
  );
};

export default AppNavbar;
