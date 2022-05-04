import Drawer from '@components/common/Drawer';
import headerLinksItems from '@constants/headerLinks';
import LayoutContentHeader from '@layout/LayoutContentHeader';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
import { useMessage } from '@hooks/contextHook';
import Toast from '@common/Toast';
import { INavData } from '@helpers';
import { ContentLoadingLineProvider } from 'context/ContentLoadingLineContext';
import { Container, Row, ToastContainer } from 'react-bootstrap';
import Header from '../LayoutHeader';
import HeaderLinks from '../LayoutHeaderLinks';
import styles from './Layout.module.scss';

interface MainLayoutProps {
  headTitle?: string;
  headDescription?: string;
  navItems?: INavData[];
  navigationActions?: string;
}

const headerBootstrapSize = 'lg';

const Layout: React.FC<MainLayoutProps> = ({
  children,
  headTitle = 'Cora SPM',
  headDescription = 'Cora SPM description',
  navItems,
  navigationActions,
}) => {
  const t = useTranslations('header');
  const [showMainDrawer, setShowMainDrawer] = React.useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = React.useState(false);
  const { message } = useMessage();
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        fluid={headerBootstrapSize}
        onLeftMenuClick={() => setShowMainDrawer(!showMainDrawer)}
        onRightMenuClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
        headerLinks={headerLinksItems}
      />
      <main className={styles.mainContent}>
        <Container fluid={headerBootstrapSize} className={styles.contentContainer}>
          <LayoutContentHeader actions={navigationActions} navItems={navItems} />
          <ContentLoadingLineProvider>
            <Row>{children}</Row>
          </ContentLoadingLineProvider>
        </Container>
        <ToastContainer position="bottom-center">
          {message && <Toast title={message.title} message={message.text} autoHide variant={message.status} />}
        </ToastContainer>
      </main>
      <Drawer title={t('main_menu')} show={showMainDrawer} handleClose={() => setShowMainDrawer(false)}>
        <HeaderLinks links={headerLinksItems} vertical />
      </Drawer>
      <Drawer title={t('main_menu')} show={showNotificationDrawer} handleClose={() => setShowNotificationDrawer(false)} placement="end">
        <div>Notifications - TODO</div>
      </Drawer>
    </>
  );
};

export default Layout;
