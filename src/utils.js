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
    return keys.map((key) => {
      const valueOfKey = value[key];
      return `{\n${'    '.repeat(level)}        ${key}: ${valueOfKey}\n${'    '.repeat(level)}    }`;
    });
  }
  return value;
};

/**
 * Render a difference AST
 * @param {Array} ast
 * @param {Number} levelDepth
 */
export const renderAST = (ast, levelDepth = 0) => {
  const res = ast.map((item) => {
    const key = Object.keys(item);
    const value = item[key];
    if (_.has(value, 'children')) {
      return (`${'    '.repeat(levelDepth)}    ${key}: {\n${renderAST(value.children, levelDepth + 1)}${'    '.repeat(levelDepth)}    }\n`);
    } if (value.flag === 'added') {
      return (`${'    '.repeat(levelDepth)}  + ${key}: ${renderKeyValue(value.valueAfter, levelDepth)}\n`);
    } if (value.flag === 'deleted') {
      return (`${'    '.repeat(levelDepth)}  - ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n`);
    } if (value.flag === 'changed') {
      return (`${'    '.repeat(levelDepth)}  - ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n${'    '.repeat(levelDepth)}  + ${key}: ${renderKeyValue(value.valueAfter, levelDepth)}\n`);
    }
    return (`${'    '.repeat(levelDepth)}    ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n`);
  }).join('');
  return res;
};

export const identity = v => v;
