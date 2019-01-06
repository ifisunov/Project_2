import { getDataFromFile, getExtName } from './utils';
import parse from './parsers';
import makeDiffAST from './diffAST';
import renderSelect from './renderers';

export default (pathToConfigFile1, pathToConfigFile2, format = 'ast') => {
  const configTree1 = parse(getDataFromFile(pathToConfigFile1), getExtName(pathToConfigFile1));
  const configTree2 = parse(getDataFromFile(pathToConfigFile2), getExtName(pathToConfigFile2));

  return renderSelect(makeDiffAST(configTree1, configTree2), format);
};
