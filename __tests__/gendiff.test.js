import fs from 'fs';
import genDiff from '../src';

const beforeFile = '__tests__/__fixtures__/before.json';
const afterFile = '__tests__/__fixtures__/after.json';
const resultFile = '__tests__/__fixtures__/result.txt';
const result = fs.readFileSync(resultFile, 'utf-8');

test('test', () => {
  expect(genDiff(beforeFile, afterFile)).toBe(result);
});
