import YAML from 'js-yaml';
import INI from 'ini';

export const parser = (dataAndFormatObj) => {
  const { data, format } = dataAndFormatObj;
  const parserObj = {
    '.json': JSON.parse,
    '.yaml': YAML.safeLoad,
    '.ini': INI.parse,
  };
  return parserObj[format](data);
};

export const render = (status, item, beforeObj, afterObj) => {
  const renderObj = {
    unchanged: `    ${item}: ${beforeObj[item]}\n`,
    changed: `  - ${item}: ${beforeObj[item]}\n  + ${item}: ${afterObj[item]}\n`,
    added: `  + ${item}: ${afterObj[item]}\n`,
    deleted: `  - ${item}: ${beforeObj[item]}\n`,
  };
  return renderObj[status];
};
