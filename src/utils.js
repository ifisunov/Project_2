import fs from 'fs';
import path from 'path';

export const getDataFromFile = file => ({
  data: fs.readFileSync(file, 'utf-8'),
  format: path.extname(file).toLowerCase(),
});

export const identity = v => v;
