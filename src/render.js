
export default (status, item, beforeObj, afterObj) => {
  switch (status) {
    case 'unchanged':
      return (`    ${item}: ${beforeObj[item]}\n`);
    case 'changed':
      return (`  - ${item}: ${beforeObj[item]}\n  + ${item}: ${afterObj[item]}\n`);
    case 'added':
      return (`  + ${item}: ${afterObj[item]}\n`);
    case 'deleted':
      return (`  - ${item}: ${beforeObj[item]}\n`);
    default:
      return undefined;
  }
};
