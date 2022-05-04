import { getString } from '@helpers';

const oidcConfig = {
  authority: getString(process.env.NEXTAUTH__PUBLIC_OIDC_AUTHORIY_URL),
  redirect_uri: getString(process.env.NEXTAUTH_URL) + getString(process.env.NEXTAUTH__PUBLIC_REDIRECT_URI),
  PostLogoutRedirectUri: getString(process.env.NEXTAUTH_URL) + getString(process.env.NEXTAUTH__PUBLIC_LOGOUT_REDIRECT_URI),
};

export default oidcConfig;
