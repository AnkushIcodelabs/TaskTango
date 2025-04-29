import sharetribeTokenStore from './sharetribeTokenStore';

const sharetribeSdk = require('sharetribe-flex-sdk');

const SHARETRIBE_SDK_CLIENT_ID = process.env.SHARETRIBE_SDK_CLIENT_ID;
const SHARETRIBE_SDK_CLIENT_SECRET = process.env.SHARETRIBE_SDK_CLIENT_SECRET;

export const sdk = sharetribeSdk.createInstance({
  clientId: SHARETRIBE_SDK_CLIENT_ID ?? '',
  tokenStore: sharetribeTokenStore({
    clientId: SHARETRIBE_SDK_CLIENT_ID ?? '',
  }),
  clientSecret: SHARETRIBE_SDK_CLIENT_SECRET ?? '',
});
