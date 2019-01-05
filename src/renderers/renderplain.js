/**
 * Utility for rendering value of object
 * @param {*} value
 */
const renderPlainKeyValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return `'${value}'`;
};

const renderingNodeMap = {
  children: (item, parent, iter) => iter(item.children, parent.concat(`${item.key}.`)),
  added: (item, parent) => `Property '${parent}${item.key}' was added with value: ${renderPlainKeyValue(item.valueAfter)}`,
  deleted: (item, parent) => `Property '${parent}${item.key}' was deleted`,
  changed: (item, parent) => `Property '${parent}${item.key}' was updated from value ${renderPlainKeyValue(item.valueBefore)} to ${renderPlainKeyValue(item.valueAfter)}`,
  unchanged: () => '',
};

/**
 * Render a plain view difference AST
 * @param {Array} ast
 */
export default (tree) => {
  const iterRender = (ast, parent = '') => {
    const renderedPlainDifference = ast.map(item => renderingNodeMap[item.type](item, parent, iterRender)).filter(v => v).join('\n');
    return renderedPlainDifference;
  };
  return iterRender(tree);
};
