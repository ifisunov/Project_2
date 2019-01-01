import fs from 'fs';
import path from 'path';
import program from 'commander';
import yaml from 'js-yaml';

// eslint-disable-next-line consistent-return
export default (file) => {
  const ext = path.extname(file);
  if (ext === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } if (ext === '.yaml' || ext === '.yml') {
    return yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
  }
  console.log('\nWrong file extansion.\n');
  program.help();
  process.exit();
};
