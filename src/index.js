import { getDataFromFile } from './utils';
import parse from './parsers';
import makeDiffAST from './diffAST';
import renderSelect from './renderers/renderselect';

export default (fileBefore, fileAfter, type = 'ast') => {
  const configTreeBefore = parse(getDataFromFile(fileBefore));
  const configTreeAfter = parse(getDataFromFile(fileAfter));
  return renderSelect(makeDiffAST(configTreeBefore, configTreeAfter), type);
};
