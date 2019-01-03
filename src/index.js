import _ from 'lodash';
import { getDataFromFile, render } from './utils';
import parse from './parsers';

export default (fileBefore, fileAfter) => {
  const objectFileBefore = parse(getDataFromFile(fileBefore));
  const objectFileAfter = parse(getDataFromFile(fileAfter));
  const unionKeysOfObjects = _.union(Object.keys(objectFileBefore), Object.keys(objectFileAfter));

  const differenceOfObjects = unionKeysOfObjects.map((key) => {
    if (_.has(objectFileBefore, key) && !_.has(objectFileAfter, key)) {
      return render('deleted', key, objectFileBefore, objectFileAfter);
    } if (!_.has(objectFileBefore, key) && _.has(objectFileAfter, key)) {
      return render('added', key, objectFileBefore, objectFileAfter);
    } if (_.has(objectFileBefore, key) && _.has(objectFileAfter, key)
      && objectFileBefore[key] === objectFileAfter[key]) {
      return render('unchanged', key, objectFileBefore, objectFileAfter);
    }
    return render('changed', key, objectFileBefore, objectFileAfter);
  });
  const difference = `{\n${differenceOfObjects.join('')}}`;
  return difference;
};
