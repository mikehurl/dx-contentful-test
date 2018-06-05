import { createClient } from 'contentful';

const contentfulClient = createClient({
  space: 'q0fubhnnmqwt',
  accessToken: '2acad1997bc77d8c35724dae80dfd9871c15aea20b29c00d93c43db56d555760'
});

export default contentfulClient;