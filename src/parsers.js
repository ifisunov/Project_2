import YAML from 'js-yaml';
import INI from 'ini';

const parserSelectMap = {
  '.json': JSON.parse,
  '.yaml': YAML.safeLoad,
  '.ini': INI.parse,
};

/**
 * Parse data to config tree object
 */
export default (data, format) => parserSelectMap[format](data);
