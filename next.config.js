const withNextIntl = require("next-intl/plugin")("./src/i18n/i18n.ts");

module.exports = withNextIntl({
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        config.plugins.push(new webpack.ContextReplacementPlugin(/keyv/));
        return config;
    },
});
