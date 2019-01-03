import YAML from 'js-yaml';
import INI from 'ini';

export default (dataAndFormatObj) => {
  const { data, format } = dataAndFormatObj;
  return {
    '.json': JSON.parse,
    '.yaml': YAML.safeLoad,
    '.ini': INI.parse,
  }[format](data);
};
