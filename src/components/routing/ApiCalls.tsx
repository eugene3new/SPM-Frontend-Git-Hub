import React from 'react';
import { SWRConfig } from 'swr';
import { useAxiosNextAuth } from '@hooks/requestHook';

const SWRNextAuthConfig: React.FC = ({ children }) => {
  const req = useAxiosNextAuth();
  return (
    <SWRConfig
      value={{
        fetcher: (url) => req.get(url).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRNextAuthConfig;
