import fs from 'fs';
import path from 'path';
import _ from 'lodash';

/**
 * Read from file.
 * Return object with data and file extension
 * @param {String} fileName
 */
export const getDataFromFile = fileName => ({
  data: fs.readFileSync(fileName, 'utf-8'),
  format: path.extname(fileName).toLowerCase(),
});

/**
 * Render difference of two plain objects
 * @param {String} flag
 * @param {String} key
 * @param {Object} beforeObj
 * @param {Object} afterObj
 */
export const render = (flag, key, beforeObj, afterObj) => ({
  unchanged: `    ${key}: ${beforeObj[key]}\n`,
  changed: `  - ${key}: ${beforeObj[key]}\n  + ${key}: ${afterObj[key]}\n`,
  added: `  + ${key}: ${afterObj[key]}\n`,
  deleted: `  - ${key}: ${beforeObj[key]}\n`,
}[flag]);

/**
 * Utility for rendering value of object
 * @param {Object || String} value
 * @param {Number} level
 */
const renderKeyValue = (value, level) => {
  if (value instanceof Object) {
    const keys = Object.keys(value);
    return keys.map((item) => {
      const valueOfKey = value[item];
      return `{\n${'    '.repeat(level)}        ${item}: ${valueOfKey}\n${'    '.repeat(level)}    }`;
    });
  }
  return value;
};

/**
 * Render a difference AST
 * @param {Array} ast
 * @param {Number} level
 */
export const renderAST = (ast, level = 0) => {
  const res = ast.map((item) => {
    const key = Object.keys(item);
    const value = item[key];
    if (_.has(value, 'children')) {
      return (`${'    '.repeat(level)}    ${key}: {\n${renderAST(value.children, level + 1)}${'    '.repeat(level)}    }\n`);
    } if (value.flag === 'added') {
      return (`${'    '.repeat(level)}  + ${key}: ${renderKeyValue(value.valueAfter, level)}\n`);
    } if (value.flag === 'deleted') {
      return (`${'    '.repeat(level)}  - ${key}: ${renderKeyValue(value.valueBefore, level)}\n`);
    } if (value.flag === 'changed') {
      return (`${'    '.repeat(level)}  - ${key}: ${renderKeyValue(value.valueBefore, level)}\n${'    '.repeat(level)}  + ${key}: ${renderKeyValue(value.valueAfter, level)}\n`);
    }
    return (`${'    '.repeat(level)}    ${key}: ${renderKeyValue(value.valueBefore, level)}\n`);
  }).join('');
  return res;
};

export const identity = v => v;
