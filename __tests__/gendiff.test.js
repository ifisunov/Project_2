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

test('JSON', () => {
  expect(genDiff(beforeFileJSON, afterFileJSON, 'ast')).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('JSON Tree', () => {
  expect(genDiff(beforeTreeFileJSON, afterTreeFileJSON, 'ast')).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});

test('YAML', () => {
  expect(genDiff(beforeFileYAML, afterFileYAML, 'ast')).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('YAML Tree', () => {
  expect(genDiff(beforeTreeFileYAML, afterTreeFileYAML, 'ast')).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});

test('INI', () => {
  expect(genDiff(beforeFileINI, afterFileINI, 'ast')).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('INI Tree', () => {
  expect(genDiff(beforeTreeFileINI, afterTreeFileINI, 'ast')).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});

test('Plain', () => {
  expect(genDiff(beforeFileINI, afterFileINI, 'plain')).toBe(fs.readFileSync(resultPlainFile, 'utf-8'));
});

test('Plain Tree', () => {
  expect(genDiff(beforeTreeFileINI, afterTreeFileINI, 'plain')).toBe(fs.readFileSync(resultPlainTreeFile, 'utf-8'));
});
