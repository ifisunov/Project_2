// import _ from 'lodash';
/**
 * Utility for rendering value of object
 * @param {*} value
 * @param {Number} level
 */
const renderKeyValue = (value, levelDepth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const keys = Object.keys(value);
  return keys.map((key) => {
    const valueOfKey = value[key];
    return `{\n${'    '.repeat(levelDepth)}        ${key}: ${valueOfKey}\n${'    '.repeat(levelDepth)}    }`;
  });
};

const renderLine = (item, levelDepth, value, type) => `\n${'    '.repeat(levelDepth)}  ${type} ${item.key}: ${renderKeyValue(value, levelDepth)}`;

const renderingNodeMap = {
  nested: (item, levelDepth, iter) => ([`\n${'    '.repeat(levelDepth + 1)}${item.key}: {`, iter(item.children, levelDepth + 1), `\n${'    '.repeat(levelDepth + 1)}}`]).join(''),
  added: (item, levelDepth) => renderLine(item, levelDepth, item.valueAfter, '+'),
  deleted: (item, levelDepth) => renderLine(item, levelDepth, item.valueBefore, '-'),
  changed: (item, levelDepth) => ([renderLine(item, levelDepth, item.valueBefore, '-'), renderLine(item, levelDepth, item.valueAfter, '+')]).join(''),
  unchanged: (item, levelDepth) => renderLine(item, levelDepth, item.valueBefore, ' '),
};

/**
 * Render a difference AST
 * @param {Array} ast
 */
export default (tree) => {
  const iterRender = (ast, levelDepth = 0) => {
    const renderedASTDifference = ast.map(item => renderingNodeMap[item.type](item, levelDepth, iterRender)).join('');
    return renderedASTDifference;
  };
  return `{${iterRender(tree)}\n}`;
};
