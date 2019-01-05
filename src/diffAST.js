import _ from 'lodash';

/**
 * Make a differense AST of two config file trees
 * @param {Object} objFileBefore
 * @param {Object} objFileAfter
 */
const makeDiffAST = (configTreeBefore, configTreeAfter) => {
  const unionKeys = _.union(Object.keys(configTreeBefore), Object.keys(configTreeAfter));
  const res = unionKeys.map((item) => {
    if (_.has(configTreeBefore, item) && !_.has(configTreeAfter, item)) {
      return { key: item, type: 'deleted', valueBefore: configTreeBefore[item] };
    } if (!_.has(configTreeBefore, item) && _.has(configTreeAfter, item)) {
      return { key: item, type: 'added', valueAfter: configTreeAfter[item] };
    } if (_.has(configTreeBefore, item) && _.has(configTreeAfter, item)
      && configTreeBefore[item] instanceof Object
      && configTreeAfter[item] instanceof Object) {
      return { key: item, type: 'nested', children: makeDiffAST(configTreeBefore[item], configTreeAfter[item]) };
    } if (_.has(configTreeBefore, item) && _.has(configTreeAfter, item)
    && (configTreeBefore[item] === configTreeAfter[item])) {
      return {
        key: item, type: 'unchanged', valueBefore: configTreeBefore[item], valueAfter: configTreeAfter[item],
      };
    }
    return {
      key: item, type: 'changed', valueBefore: configTreeBefore[item], valueAfter: configTreeAfter[item],
    };
  });
  return res;
};

export default makeDiffAST;
