import fs from 'fs';
import path from 'path';

/**
 * Read from file.
 * Return object with data and file extension
 * @param {String} fileName
 */
export const getDataFromFile = fileName => ({
  data: fs.readFileSync(fileName, 'utf-8'),
  format: path.extname(fileName).toLowerCase(),
});

export const identity = v => v;
