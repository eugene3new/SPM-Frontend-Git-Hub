import React from 'react';
import '@styles/main.scss';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';
import AuthGuard from '@components/routing/AuthGuard';
import { NextIntlProvider } from 'next-intl';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import SWRNextAuthConfig from '@components/routing/ApiCalls';
import { NotificationProvider } from 'context/NotificationContext';

export type AuthNextPage = NextPage & { isNotProtected?: boolean; auth?: { role: string } };

// TODO - WARNING! DELETE THIS WHEN DEPLOYING. BYPASSING HTTPS FOR LOCAL
if (process.env.NEXTAUTH_PUBLIC_NODE_ENV) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

interface IAppProps<P = Record<string, unknown>> extends AppProps<P> {
  Component: NextComponentType<NextPageContext, any, P> & { isNotProtected: boolean };
}

const App: React.FC<IAppProps> = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      {(
        <AuthProvider session={pageProps.session}>
          <AuthGuard>
            <SWRNextAuthConfig>
              <NotificationProvider>
                <Component {...pageProps} />
              </NotificationProvider>
            </SWRNextAuthConfig>
          </AuthGuard>
        </AuthProvider>
      )}
    </NextIntlProvider>
  );
};

export default App;
