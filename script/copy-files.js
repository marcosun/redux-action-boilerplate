/* eslint-disable */

import path from 'path';
import fse from 'fs-extra';

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

async function run() {
  await ['README.md', 'LICENSE', 'package.json'].map(file => copyFile(file));
}

run();
