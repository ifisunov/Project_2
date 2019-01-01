import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const ext = path.extname(file);
  if (ext === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } if (ext === '.yaml' || ext === '.yml') {
    return yaml.safeLoad(fs.readFileSync(file, 'utf-8'), 'utf-8');
  }
  return undefined;
};
