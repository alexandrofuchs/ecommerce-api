module.exports = {
  security: {
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },
  },
  log: {
    level: 'debug'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
    // trustProxy: true,
  },
  // port: 80,
  // ssl: undefined,
  custom: {
    baseUrl: 'https://example.com',
    internalEmailAddress: 'support@example.com',
  },
};
