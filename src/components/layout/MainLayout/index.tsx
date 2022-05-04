import styles from './MainLayout.module.scss';

const MainLayout: React.FC = ({ children }) => <div className={styles.container}>{children}</div>;

export default MainLayout;
