const rm = require('rimraf');
const ls = require('ls');
const cypressConfig = require('../cypress');

const { reportDir } = cypressConfig.reporterOptions;
const reportFiles = `${reportDir}/*.json`;
// list all of existing report files
ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`));

// delete all existing report files
rm(reportFiles, error => {
  if (error) {
    console.error(`Error while removing existing report files: ${error}`);
    process.exit(1);
  }
  console.log('Removing all existing report files successfully!');
});
