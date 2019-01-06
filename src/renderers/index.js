import renderAST from './renderast';
import plainRenderAST from './renderplain';

const selectRenderType = {
  ast: renderAST,
  plain: plainRenderAST,
  json: JSON.stringify,
};

export default (ast, type) => selectRenderType[type](ast);
