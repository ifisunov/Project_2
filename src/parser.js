import fs from 'fs';
import path from 'path';
import program from 'commander';
import yaml from 'js-yaml';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

export default (file) => {
  const ext = path.extname(file);
  if (ext === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } if (ext === '.yaml' || ext === '.yml') {
    return yaml.safeLoad(fs.readFileSync(file, 'utf-8'));
  }
  console.log('\nWrong file extansion.\n'.red.bold);
  program.help();
  return undefined;
};
