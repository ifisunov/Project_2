import fs from 'fs';
import path from 'path';

export const getDataFromFile = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

export const getExtName = pathToFile => path.extname(pathToFile).toLowerCase();

// export const identity = v => v;
