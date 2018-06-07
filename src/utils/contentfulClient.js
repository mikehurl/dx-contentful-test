import { createClient } from 'contentful';

const contentfulClient = (space, accessToken) => createClient({
  space,
  accessToken
});

export default contentfulClient;