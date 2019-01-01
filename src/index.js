import _ from 'lodash';
import parser from './parser';
import render from './render';

export default (beforeFile, afterFile) => {
  const beforeObj = parser(beforeFile);
  const afterObj = parser(afterFile);
  const unionArr = _.union(Object.keys(beforeObj), Object.keys(afterObj));

  const difference = `{\n${unionArr.map((item) => {
    if (_.has(beforeObj, item) && !_.has(afterObj, item)) {
      return render('deleted', item, beforeObj, afterObj);
    } if (!_.has(beforeObj, item) && _.has(afterObj, item)) {
      return render('added', item, beforeObj, afterObj);
    } if (_.has(beforeObj, item) && _.has(afterObj, item) && beforeObj[item] === afterObj[item]) {
      return render('unchanged', item, beforeObj, afterObj);
    }
    return render('changed', item, beforeObj, afterObj);
  }).join('')}}`;
  console.log(difference);
  return difference;
};
