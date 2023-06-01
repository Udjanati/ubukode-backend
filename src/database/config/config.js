require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: "Mysql,2022",
    database: "ubukode4",
    host: "127.0.0.1",
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_TEST_USERNAME,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_TEST_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    dialect: 'mysql',
  },
};
