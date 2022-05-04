import styles from './layoutContentBodyHeader.module.scss';

interface LayoutContentBodyHeaderProps {
  title: string;
}

const LayoutContentBodyHeader: React.FC<LayoutContentBodyHeaderProps> = ({ children, title }) => {
  return (
    <>
      <div className={styles.layoutContentBodyHeader}>
        <h1>{title}</h1>
        {children}
      </div>
      <hr />
    </>
  );
};

export default LayoutContentBodyHeader;
