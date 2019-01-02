import _ from 'lodash';
import { getDataFromFile } from './utils';
import { parser, render } from './parsers';

export default (beforeFile, afterFile) => {
  const beforeObj = parser(getDataFromFile(beforeFile));
  const afterObj = parser(getDataFromFile(afterFile));
  const unionArr = _.union(Object.keys(beforeObj), Object.keys(afterObj));

  const differenceArr = unionArr.map((item) => {
    if (_.has(beforeObj, item) && !_.has(afterObj, item)) {
      return render('deleted', item, beforeObj, afterObj);
    } if (!_.has(beforeObj, item) && _.has(afterObj, item)) {
      return render('added', item, beforeObj, afterObj);
    } if (_.has(beforeObj, item) && _.has(afterObj, item) && beforeObj[item] === afterObj[item]) {
      return render('unchanged', item, beforeObj, afterObj);
    }
    return render('changed', item, beforeObj, afterObj);
  });
  const difference = `{\n${differenceArr.join('')}}`;
  return difference;
};
