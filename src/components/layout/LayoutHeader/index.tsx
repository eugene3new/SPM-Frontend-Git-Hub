import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import { BellIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { IMAGE_PATH } from '@constants/assetPath';
import { Dropdown } from '@cora/cora-component-library/dist';
import { ILinkProps } from '@constants/headerLinks';
import styles from './header.module.scss';
import HeaderLinks from '../LayoutHeaderLinks';

interface HeaderProps {
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  onLeftMenuClick: () => void;
  onRightMenuClick: () => void;
  headerLinks?: ILinkProps[];
}

const Header: React.FC<HeaderProps> = ({ fluid, onLeftMenuClick, onRightMenuClick, headerLinks }) => {
  const [showMenuButton, setShowMenuButton] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (headerLinks && headerLinks.length > 0) {
      setShowMenuButton(true);
    }
  }, [headerLinks]);

  return (
    <Navbar fixed="top" className={styles.root}>
      <Container fluid={fluid}>
        {showMenuButton && (
          <Nav className="d-md-none">
            <Nav.Link type="button" href="#menu" onClick={() => onLeftMenuClick()}>
              <ThreeBarsIcon size={24} />
            </Nav.Link>
          </Nav>
        )}
        <Navbar.Brand href="/" className={styles.brand}>
          <Image src={IMAGE_PATH.logo} width={156} height={67} />
        </Navbar.Brand>
        <HeaderLinks links={headerLinks} className="d-none d-md-flex" />
        <Nav>
          <Nav.Link href="#notifications" onClick={onRightMenuClick} className={styles.icons}>
            <BellIcon size={24} />
          </Nav.Link>
          <Nav.Link eventKey={2} href="#profile">
            <Dropdown label="FB" type="round" listItems={[]} color="secondary" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
