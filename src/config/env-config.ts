import { environment } from '../environments/environment';

export const API_URL = {
    STRIPE_SESSION_CREATE:
    environment.API_URL + 'create-payment-intent',
    STRIPE_API_KEY: environment.STRIPE_CLIENT_TOKEN
  };