import { getDataFromFile, getExtName } from './utils';
import parse from './parsers';
import makeDiffAST from './diffAST';
import renderSelect from './renderers';

export default (firstConfigFile, secondConfigFile, format = 'ast') => {
  const configTreeBefore = parse(getDataFromFile(firstConfigFile), getExtName(firstConfigFile));
  const configTreeAfter = parse(getDataFromFile(secondConfigFile), getExtName(secondConfigFile));

  return renderSelect(makeDiffAST(configTreeBefore, configTreeAfter), format);
};
