import _ from 'lodash';

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
export const renderAST = (tree) => {
  const iterRender = (ast, levelDepth = 0) => {
    const renderedASTDifference = ast.map((item) => {
      const key = Object.keys(item);
      const value = item[key];
      if (_.has(value, 'children')) {
        return (`${'    '.repeat(levelDepth)}    ${key}: {\n${iterRender(value.children, levelDepth + 1)}${'    '.repeat(levelDepth)}    }\n`);
      } if (value.flag === 'added') {
        return (`${'    '.repeat(levelDepth)}  + ${key}: ${renderKeyValue(value.valueAfter, levelDepth)}\n`);
      } if (value.flag === 'deleted') {
        return (`${'    '.repeat(levelDepth)}  - ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n`);
      } if (value.flag === 'changed') {
        return (`${'    '.repeat(levelDepth)}  - ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n${'    '.repeat(levelDepth)}  + ${key}: ${renderKeyValue(value.valueAfter, levelDepth)}\n`);
      }
      return (`${'    '.repeat(levelDepth)}    ${key}: ${renderKeyValue(value.valueBefore, levelDepth)}\n`);
    }).join('');
    return renderedASTDifference;
  };
  return `{\n${iterRender(tree)}}`;
};

const renderPlainKeyValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export const plainRenderAST = (ast, parent = '') => {
  const renderedPlainDifference = ast.map((item) => {
    const key = Object.keys(item);
    const value = item[key];
    if (_.has(value, 'children')) {
      return plainRenderAST(value.children, parent.concat(`${key}.`));
    } if (value.flag === 'added') {
      return (`Property '${parent}${key}' was added with value: ${renderPlainKeyValue(value.valueAfter)}\n`);
    } if (value.flag === 'deleted') {
      return (`Property '${parent}${key}' was deleted\n`);
    } if (value.flag === 'changed') {
      return (`Property '${parent}${key}' was updated from value ${renderPlainKeyValue(value.valueBefore)} to ${renderPlainKeyValue(value.valueAfter)}\n`);
    }
    return '';
  }).filter(v => v).join('');
  return renderedPlainDifference;
};

export const renderSelect = (ast, type) => ({
  ast: renderAST,
  plain: plainRenderAST,
}[type](ast));
