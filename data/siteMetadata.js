/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Tech Notes',
  author: 'Backend Developer',
  headerTitle: 'Tech Notes',
  description: '백엔드·서버·운영 관점에서 문제를 이해하고 해결하는 과정을 기록하는 개발 블로그',
  language: 'ko',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tech-notes-nu.vercel.app',
  siteRepo: 'https://github.com/simeunyoung/tech-notes',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  mastodon: '',
  email: '',
  github: 'https://github.com/simeunyoung',
  x: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'ko-KR',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  analytics: {},
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: '',
  },
  comments: {
    provider: '',
  },

  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
