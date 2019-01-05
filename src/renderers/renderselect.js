import renderAST from './renderast';
import plainRenderAST from './renderplain';

const selectRenderType = {
  ast: renderAST,
  plain: plainRenderAST,
};

export default (ast, type) => {
  return selectRenderType[type](ast);
};
