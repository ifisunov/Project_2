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

test('JSON', () => {
  expect(genDiff(beforeFileJSON, afterFileJSON)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('JSON Tree', () => {
  expect(genDiff(beforeTreeFileJSON, afterTreeFileJSON)).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});

test('YAML', () => {
  expect(genDiff(beforeFileYAML, afterFileYAML)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('YAML Tree', () => {
  expect(genDiff(beforeTreeFileYAML, afterTreeFileYAML)).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});

test('INI', () => {
  expect(genDiff(beforeFileINI, afterFileINI)).toBe(fs.readFileSync(resultFile, 'utf-8'));
});

test('INI Tree', () => {
  expect(genDiff(beforeTreeFileINI, afterTreeFileINI)).toBe(fs.readFileSync(resultTreeFile, 'utf-8'));
});
