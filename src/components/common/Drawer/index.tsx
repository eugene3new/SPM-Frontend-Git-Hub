import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import { OffcanvasPlacement } from 'react-bootstrap/esm/Offcanvas';
// import styles from './drawer.module.scss';

interface IDrawer {
  show: boolean;
  handleClose: () => void;
  title: string;
  placement?: OffcanvasPlacement;
}

const Drawer: React.FC<IDrawer> = ({ show, handleClose, children, title, placement = 'start' }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement={placement}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Image src="/images/cora_logo.png" width={156} height={67} />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default Drawer;
