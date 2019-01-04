import { getDataFromFile, renderAST } from './utils';
import parse from './parsers';
import { makeDiffAST } from './diffAST';

export default (fileBefore, fileAfter) => {
  const configTreeBefore = parse(getDataFromFile(fileBefore));
  const configTreeAfter = parse(getDataFromFile(fileAfter));
  const differenceOfObjects = renderAST(makeDiffAST(configTreeBefore, configTreeAfter));
  const difference = `{\n${differenceOfObjects}}`;
  return difference;
};
