import { Nav } from 'react-bootstrap/';
import { TabsProps } from './tabs.props';

const Tabs = ({
  activePage,
  tablePages,
  onChangeActivePage,
}: TabsProps): JSX.Element => {
  return (
    <Nav
      variant='underline'
      defaultActiveKey={activePage}
      className='position-sticky bottom-0 bg-body-tertiary p-2'
    >
      {tablePages.map((item) => (
        <Nav.Item onClick={() => onChangeActivePage(item)}>
          <Nav.Link eventKey={item} active={activePage === item}>
            {item}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};
export default Tabs;
