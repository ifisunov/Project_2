import fs from 'fs';
import path from 'path';

export const getDataFromFile = fileName => ({
  data: fs.readFileSync(fileName, 'utf-8'),
  format: path.extname(fileName).toLowerCase(),
});

export const render = (flag, key, beforeObj, afterObj) => ({
  unchanged: `    ${key}: ${beforeObj[key]}\n`,
  changed: `  - ${key}: ${beforeObj[key]}\n  + ${key}: ${afterObj[key]}\n`,
  added: `  + ${key}: ${afterObj[key]}\n`,
  deleted: `  - ${key}: ${beforeObj[key]}\n`,
}[flag]);

export const identity = v => v;
