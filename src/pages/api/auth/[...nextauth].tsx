import { getString } from '@helpers';
import NextAuth, { Account, Profile, Session, User } from 'next-auth';
import { Awaitable } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';
import Providers, { OAuthConfig } from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.IdentityServer4({
      id: getString(process.env.OIDC_CLIENT_ID),
      name: getString(process.env.OIDC_CLIENT_ID),
      clientId: getString(process.env.OIDC_CLIENT_ID),
      scope: getString(process.env.OIDC_SCOPE),
      protection: ['pkce', 'state'],
      domain: getString(process.env.OIDC_DOMAIN),
    }),
  ],
  callbacks: {
    async jwt(token: JWT & { accessToken: string }, user?: User | undefined, account?: (Account & { access_token: string }) | undefined) {
      const newTokenObject = token;
      if (account) {
        newTokenObject.accessToken = account.access_token;
      }
      return newTokenObject;
    },
    async session(session: Session, token: User | JWT) {
      const newSessionObject = session;
      newSessionObject.user = token;
      return session;
    },
  },
});
