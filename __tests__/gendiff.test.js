import fs from 'fs';
import genDiff from '../src';

const beforeFileJSON = '__tests__/__fixtures__/before.json';
const afterFileJSON = '__tests__/__fixtures__/after.json';
const beforeTreeFileJSON = '__tests__/__fixtures__/beforetree.json';
const afterTreeFileJSON = '__tests__/__fixtures__/aftertree.json';

const beforeFileYAML = '__tests__/__fixtures__/before.yaml';
const afterFileYAML = '__tests__/__fixtures__/after.yaml';
const beforeTreeFileYAML = '__tests__/__fixtures__/beforetree.yaml';
const afterTreeFileYAML = '__tests__/__fixtures__/aftertree.yaml';

const beforeFileINI = '__tests__/__fixtures__/before.ini';
const afterFileINI = '__tests__/__fixtures__/after.ini';
const beforeTreeFileINI = '__tests__/__fixtures__/beforetree.ini';
const afterTreeFileINI = '__tests__/__fixtures__/aftertree.ini';

const resultFile = '__tests__/__fixtures__/result.txt';
const resultTreeFile = '__tests__/__fixtures__/resulttree.txt';
const resultPlainFile = '__tests__/__fixtures__/resultplain.txt';
const resultPlainTreeFile = '__tests__/__fixtures__/resultplaintree.txt';

describe('AST test:', () => {
  test.each`
    before                | after                 | result
    ${beforeFileJSON}     | ${afterFileJSON}      | ${resultFile}
    ${beforeTreeFileJSON} | ${afterTreeFileJSON}  | ${resultTreeFile}
    ${beforeFileYAML}     | ${afterFileYAML}      | ${resultFile}
    ${beforeTreeFileYAML} | ${afterTreeFileYAML}  | ${resultTreeFile}
    ${beforeFileINI}      | ${afterFileINI}       | ${resultFile}
    ${beforeTreeFileINI}  | ${afterTreeFileINI}   | ${resultTreeFile}
  `('Difference between: $before and $after', ({ before, after, result }) => {
  expect(genDiff(before, after, 'ast')).toBe(fs.readFileSync(result, 'utf-8'));
});
});

describe('Plain AST test', () => {
  test.each`
    before                | after                 | result
    ${beforeFileYAML}     | ${afterFileYAML}      | ${resultPlainFile}
    ${beforeFileJSON}     | ${afterFileJSON}      | ${resultPlainFile}
    ${beforeFileINI}      | ${afterFileINI}       | ${resultPlainFile}
    ${beforeTreeFileINI}  | ${afterTreeFileINI}   | ${resultPlainTreeFile}
    ${beforeTreeFileJSON} | ${afterTreeFileJSON}  | ${resultPlainTreeFile}
    ${beforeTreeFileYAML} | ${afterTreeFileYAML}  | ${resultPlainTreeFile}
  `('Difference between: $before and $after', ({ before, after, result }) => {
  expect(genDiff(before, after, 'plain')).toBe(fs.readFileSync(result, 'utf-8'));
});
});
