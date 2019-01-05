import renderAST from './renderast';
import plainRenderAST from './renderplain';

export default (ast, type) => ({
  ast: renderAST,
  plain: plainRenderAST,
}[type](ast));
