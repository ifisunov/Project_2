import _ from 'lodash';

/**
 * Make a differense AST of two config file trees
 * @param {Object} objFileBefore
 * @param {Object} objFileAfter
 */
export const makeDiffAST = (configTreeBefore, configTreeAfter) => {
  const unionKeys = _.union(Object.keys(configTreeBefore), Object.keys(configTreeAfter));
  const res = unionKeys.map((item) => {
    if (_.has(configTreeBefore, item) && !_.has(configTreeAfter, item)) {
      return {
        [item]: {
          flag: 'deleted',
          valueBefore: configTreeBefore[item],
        },
      };
    } if (!_.has(configTreeBefore, item) && _.has(configTreeAfter, item)) {
      return {
        [item]: {
          flag: 'added',
          valueAfter: configTreeAfter[item],
        },
      };
    } if (_.has(configTreeBefore, item) && _.has(configTreeAfter, item)
      && configTreeBefore[item] instanceof Object
      && configTreeAfter[item] instanceof Object) {
      return {
        [item]: {
          flag: 'unchanged',
          children: makeDiffAST(configTreeBefore[item], configTreeAfter[item]),
        },
      };
    } if (_.has(configTreeBefore, item) && _.has(configTreeAfter, item)
    && (configTreeBefore[item] === configTreeAfter[item])) {
      return {
        [item]: {
          flag: 'unchanged',
          valueBefore: configTreeBefore[item],
          valueAfter: configTreeAfter[item],
        },
      };
    }
    return {
      [item]: {
        flag: 'changed',
        valueBefore: configTreeBefore[item],
        valueAfter: configTreeAfter[item],
      },
    };
  });
  return res;
};

export const identity = v => v;
