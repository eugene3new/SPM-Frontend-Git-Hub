import { useSession, signIn } from 'next-auth/client';
import React from 'react';
import oidcConfig from '@constants/oidcConfig';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { DefaultSession } from 'next-auth';
import { Spinner } from '@cora/cora-component-library/dist';

export interface CustomSession extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string | null;
  };
  expires?: string;
}

const AuthGuard: React.FC = ({ children }) => {
  const [data, isLoading]: [data: CustomSession | null, isLoading: boolean] = useSession();
  const isUser = data?.user?.accessToken;
  // Redirect
  React.useEffect(() => {
    if (isLoading) return;
    if (!isUser)
      signIn(
        'spm-frontend',
        {
          callbackUrl: process.env.NEXT_PUBLIC_APP_URL,
        },
        oidcConfig
      );
  }, [isUser, isLoading]);

  if (isUser) {
    return <>{children}</>;
  }
  const containerStyle = { height: '100vh' };
  return (
    <div style={containerStyle}>
      <Spinner showSpinner text="Loading" />
    </div>
  );
};

export default AuthGuard;
