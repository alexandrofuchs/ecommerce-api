module.exports = {
    security: {
      cors: {
        allRoutes: true, 
        },
    },
    log: {
      level: 'debug'
    },
    http: {
      cache: 365.25 * 24 * 60 * 60 * 1000, // One year
      // trustProxy: true,
    },
    port: 1337,
    // ssl: undefined,
    custom: {
      baseUrl: 'https://example.com',
      internalEmailAddress: 'support@example.com',
    },
  };
  