const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n/i18n.ts"
);

module.exports = withNextIntl({
  // Other Next.js configuration ...
});
