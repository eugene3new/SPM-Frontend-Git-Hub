import React from 'react';
import { Toast as ReactBootstrapToast } from 'react-bootstrap';
import styled from 'styled-components';

export interface ToastProps {
  title: string;
  message: string;
  autoHide: boolean;
  variant: 'success' | 'warning' | 'info' | 'danger';
  actionText?: string;
  action?: () => void;
}

const ToastHeader = styled(ReactBootstrapToast.Header)<{ color: string }>`
  background-color: var(--cora-${({ color }) => color});
  border-bottom: none;
  border-top: 5px solid var(--cora-${({ color }) => color}-dark);
  color: var(--bs-body-color);
`;

const ToastBody = styled(ReactBootstrapToast.Body)<{ color: string }>`
  background-color: var(--cora-${({ color }) => color});
  padding-top: 0;
`;

const ToastFooter = styled.div<{ color: string }>`
  background-color: var(--cora-${({ color }) => color});
`;

const ToastAction = styled.div`
  width: 100%;
  padding: 5px;
  text-decoration: underline;
  cursor: pointer;
  text-align: right;
`;

export const Toast: React.FC<ToastProps> = ({ title, message, autoHide, variant, actionText, action }) => {
  const [show, setShow] = React.useState(false);

  const showToast = () => setShow(true);
  const hideToast = () => setShow(false);

  React.useEffect(() => {
    showToast();
  }, [message]);

  return (
    <ReactBootstrapToast show={show} onClose={hideToast} autohide={autoHide} delay={5000} className={variant}>
      <ToastHeader color={variant}>
        <span className="me-auto">{title}</span>
      </ToastHeader>
      <ToastBody color={variant}>{message}</ToastBody>
      <ToastFooter color={variant}>
        <ToastAction onClick={action}>{actionText}</ToastAction>
      </ToastFooter>
    </ReactBootstrapToast>
  );
};

export default Toast;
