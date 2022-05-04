import styles from './NoContent.module.scss';

interface NoContentProps {
  text: string;
}

const NoContent: React.FC<NoContentProps> = ({ text }) => {
  return <div className={styles.root}>{text}</div>;
};

export default NoContent;
