/**
 * Utility for rendering value of object
 * @param {*} value
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

const renderingNodeMap = {
  children: (item, levelDepth, iter) => `${'    '.repeat(levelDepth)}    ${item.key}: {\n${iter(item.children, levelDepth + 1)}${'    '.repeat(levelDepth)}    }\n`,
  added: (item, levelDepth) => `${'    '.repeat(levelDepth)}  + ${item.key}: ${renderKeyValue(item.valueAfter, levelDepth)}\n`,
  deleted: (item, levelDepth) => `${'    '.repeat(levelDepth)}  - ${item.key}: ${renderKeyValue(item.valueBefore, levelDepth)}\n`,
  changed: (item, levelDepth) => `${'    '.repeat(levelDepth)}  - ${item.key}: ${renderKeyValue(item.valueBefore, levelDepth)}\n${'    '.repeat(levelDepth)}  + ${item.key}: ${renderKeyValue(item.valueAfter, levelDepth)}\n`,
  unchanged: (item, levelDepth) => `${'    '.repeat(levelDepth)}    ${item.key}: ${renderKeyValue(item.valueBefore, levelDepth)}\n`,
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
  return `{\n${iterRender(tree)}}`;
};
