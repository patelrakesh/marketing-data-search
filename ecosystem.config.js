// Target server hostname or IP address
const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : '';
// Target server username
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// Target server application path
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app/back-end-marketing`;
// Your repository
const REPO = 'git@gitlab.com:pitchdb/marketing-data-search.git';

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'market-data-api',
      script: './build/main.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8083,
        MONGO_AUTH_CONNECTION_URL_DATA: process.env.MONGO_AUTH_CONNECTION_URL_DATA,
        AUTHORITY_SPARK_SECRET: process.env.AUTHORITY_SPARK_SECRET,
        PITCHDB_SERVER_SECRET: process.env.PITCHDB_SERVER_SECRET,
        CLEARBIT_API_KEY: process.env.CLEARBIT_API_KEY
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/master',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      'post-deploy': 'npm install --production'
        + ' && npm run build'
        + ' && pm2 startOrRestart ecosystem.config.js --env production --update-env'
        + ' && pm2 save'
    }
  }
};