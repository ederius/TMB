module.exports = {
    production: {
      domain: 'http://domain.com',
      database: {
        uri: process.env.DB_uri,
        username: process.env.PRODUCTION_DB_username,
        password: process.env.PRODUCTION_DB_password,
      }
    },
    QA: {
      domain: 'http://domain.com',
      database: {
        uri: process.env.DB_uri,
        username: process.env.QA_DB_username,
        password: process.env.QA_DB_password,
      }
    },
    development: {
      domain: 'http://localhost',
      database: {
        uri: process.env.DB_uri,
        username: process.env.DEVELOPMENT_DB_username,
        password: process.env.DEVELOPMENT_DB_password,
      }
    },
  };
  
  