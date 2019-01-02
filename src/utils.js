import fs from 'fs';
import path from 'path';
import program from 'commander';
import yaml from 'js-yaml';
import ini from 'ini';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';

export const getDataFromFile = (file) => {
  const ext = (path.extname(file)).toLowerCase();
  if (ext === '.json') {
    return {
      data: fs.readFileSync(file, 'utf-8'),
      format: 'JSON',
    };
  } if (ext === '.yaml' || ext === '.yml') {
    return {
      data: fs.readFileSync(file, 'utf-8'),
      format: 'YAML',
    };
  }
  if (ext === '.ini') {
    return {
      data: fs.readFileSync(file, 'utf-8'),
      format: 'INI',
    };
  }
  console.log('\nWrong file extension.\n'.red.bold);
  program.help();
  return undefined;
};

export const parser = (dataAndFormatObj) => {
  const { data, format } = dataAndFormatObj;
  if (format === 'JSON') {
    return JSON.parse(data);
  } if (format === 'YAML') {
    return yaml.safeLoad(data);
  } if (format === 'INI') {
    return ini.parse(data);
  }
  return undefined;
};


export const render = (status, item, beforeObj, afterObj) => {
  switch (status) {
    case 'unchanged':
      return (`    ${item}: ${beforeObj[item]}\n`);
    case 'changed':
      return (`  - ${item}: ${beforeObj[item]}\n  + ${item}: ${afterObj[item]}\n`);
    case 'added':
      return (`  + ${item}: ${afterObj[item]}\n`);
    case 'deleted':
      return (`  - ${item}: ${beforeObj[item]}\n`);
    default:
      return undefined;
  }
};
