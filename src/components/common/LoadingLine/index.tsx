import clsx from 'clsx';
import styles from './LoadingLine.module.scss';

const LoadingLine: React.FC<{ isShowing: boolean }> = ({ isShowing }) => {
  if (!isShowing) {
    return <div className={styles.root} />;
  }
  return (
    <div className={clsx(styles.root, styles.loadBar)}>
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
};

export default LoadingLine;
