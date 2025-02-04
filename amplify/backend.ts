import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/post-confirmation/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
});
