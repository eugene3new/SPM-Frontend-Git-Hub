import styles from './FormContainer.module.scss';

export const FormContainer: React.FC = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default FormContainer;
