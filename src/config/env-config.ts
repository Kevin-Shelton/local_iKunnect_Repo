import { environment } from '../environments/environment';

export const REGEX_PATTERNS = {
  ALLOW_STRING_PATTERN: "^[a-zA-Z -']+",
  PHONE_NUMBER_PATTERN: /^\d{10}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ZIP_PATTERN: '^[0-9-]{5}(?:-[0-9]{4})?$',
};

export const API_URL = {
  STRIPE_API_KEY: environment.STRIPE_CLIENT_TOKEN,
  ZAMMAD_URL: environment.ZAMMAD_CHAT_URL + `assets/chat/chat-no-jquery.min.js`,
  ZAMMAD_WS: environment.ZAMMAD_WEBSOCKET,
  GET_PRODUCTS: environment.CORE_URL + `get-product`,
  CREATE_CHECKOUT_SESSION: environment.CORE_URL + `create-checkout-session`,
  SESSION_STATUS: environment.CORE_URL + `session-status`,
  SELF_CHECKOUT: environment.CORE_URL + `self-checkout`,
  BOOK_DEMO: environment.CORE_URL + `BookADemo/BookADemo`,
  SAVE_CUSTOMER_PLAN: environment.CORE_URL + `CustomerLicense/SaveCustomerLicenseDetails`,
 GET_WP_POSTS_BY_CATEGORY: (id: number) => environment.WORD_PRESS + `posts?categories=${id}`,
 GET_WP_CATEGORIES: environment.WORD_PRESS+ `categories`,
 GET_WP_POST_AUTHOR: (id: number) => environment.WORD_PRESS+ `users/${id}`
 
};

