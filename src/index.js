import _ from 'lodash';
import fs from 'fs';

const renderStr = (status, item, beforeObj, afterObj) => {
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

export default (beforeFile, afterFile) => {
  const beforeObj = JSON.parse(fs.readFileSync(beforeFile, 'utf-8'));
  const afterObj = JSON.parse(fs.readFileSync(afterFile, 'utf-8'));
  const unionArr = _.union(Object.keys(beforeObj), Object.keys(afterObj));

  const difference = `{\n${unionArr.map((item) => {
    if (_.has(beforeObj, item) && !_.has(afterObj, item)) {
      return renderStr('deleted', item, beforeObj, afterObj);
    } if (!_.has(beforeObj, item) && _.has(afterObj, item)) {
      return renderStr('added', item, beforeObj, afterObj);
    } if (_.has(beforeObj, item) && _.has(afterObj, item) && beforeObj[item] === afterObj[item]) {
      return renderStr('unchanged', item, beforeObj, afterObj);
    }
    return renderStr('changed', item, beforeObj, afterObj);
  }).join('')}}`;
  console.log(difference);
  return difference;
};
