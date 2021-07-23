require('dotenv-extended')
  .load({
    path: `feature/acceptance/config/codecept.${process.env.NODE_ENV}.env`,
    defaults : 'feature/acceptance/config/codecept.dev.env'
  });

require('ts-node/register');


const {
  configure,
  cleanReports,
  reportCollector
} = require('codeceptjs-configure');
const REPORT_OUTPUT_DIR = 'feature/acceptance/report';
const REPORT_COLLECTION_DIR = 'feature/acceptance/report_collections';

let conf = {
  name: 'UI-framework',

  output: REPORT_OUTPUT_DIR,

  async teardown() {
    reportCollector({ reportOutputDir: REPORT_OUTPUT_DIR });
  },

  bootstrap: callback => {
    cleanReports({
      path: REPORT_OUTPUT_DIR,
      relativePath: '/',
      callback
    });

    cleanReports({
      path: REPORT_COLLECTION_DIR,
      relativePath: '/',
      callback
    });
  },


  helpers: {
    driver_helper: {
      require: './feature/acceptance/helpers/driver.helper',
    },
  },
};

exports.config = configure.create(conf);
