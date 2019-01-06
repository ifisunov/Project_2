import fs from 'fs';
import path from 'path';

export const getDataFromFile = fileName => fs.readFileSync(fileName, 'utf-8');

export const getExtName = fileName => path.extname(fileName).toLowerCase();

// export const identity = v => v;
