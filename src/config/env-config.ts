import { environment } from '../environments/environment';

export const API_URL = {
  STRIPE_SESSION_CREATE: environment.API_URL + 'create-payment-intent',
  STRIPE_API_KEY: environment.STRIPE_CLIENT_TOKEN,
  ZAMMAD_URL: environment.ZAMMAD_CHAT_URL + `assets/chat/chat-no-jquery.min.js`,
  ZAMMAD_WS: environment.ZAMMAD_WEBSOCKET,
  GET_PRODUCTS: environment.CORE_URL + `get-product`,
  CREATE_CHECKOUT_SESSION: environment.CORE_URL + `create-checkout-session`,
  SESSION_STATUS: environment.CORE_URL + `session-status`,
  SELF_CHECKOUT: environment.CORE_URL + `self-checkout`,
};
