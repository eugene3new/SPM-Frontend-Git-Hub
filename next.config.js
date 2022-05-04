require('dotenv').config({ path: `${process.env.ENVIRONMENT}` });

module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
};
