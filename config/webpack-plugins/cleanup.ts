import * as fs from 'fs';
import * as path from 'path';
import * as WebpackOnBuildPlugin from 'on-build-webpack';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

const distDir = path.resolve(__dirname, '../../dist');

// for each newly emitted files
//    find all matching files (name.hash.ext)
//    delete all but the latest matches

async function getMatchingFiles(f: string): Promise<string[]> {
  // if a filename is name.hash.ext
  // create a regex that matches name.[a-f0-9]{20,32}.ext
  // use the regex to identify matching files
  // ignore files that don't have a hash since they won't proliferate
  const fullPath = path.join(distDir, f);
  const dirName = path.dirname(fullPath);
  const fileName = path.basename(fullPath);
  const fileParts = fileName.split('.');
  let atLeastOneMatchFound = false;
  const regexString =
    fileParts.
      map(s => {
        if (/[a-f0-9]{20,32}/.test(s)) {
          atLeastOneMatchFound = true;
          return '[a-f0-9]{20,32}'
        }
        return s;
      })
      .join('\\.');

  if (!atLeastOneMatchFound) return [];

  const r = new RegExp(regexString);

  const files = await readdir(dirName);

  return files.filter(f => r.test(f)).map(f => path.join(dirName, f));
}

async function getDeletionCandidates(newAssets): Promise<{ [key: string]: string[] }> {
  const result = {};

  for (const k in newAssets) {
    if (newAssets[k].emitted) {
      const matchingFiles = await getMatchingFiles(k);
      if (matchingFiles.length > 1) {
        result[k] = matchingFiles;
      }
    }
  }

  return result;
}

async function deleteOldestFromList(files: string[]) {
  const stats = await Promise.all(files.map(async f => ({ name: f, stats: await stat(f) })));

  stats.sort((a, b) => a.stats.mtime > b.stats.mtime ? -1 : 1);
  stats.slice(1).map(async s => {
    try {
      await unlink(s.name);
      console.log('>> Deleted: ', s.name);
    } catch (e) { }
  });
}

function cleanUp() {
  return new WebpackOnBuildPlugin(async (stats) => {
    const newAssets: string[] = stats.compilation.assets;

    const deletionCandidates = await getDeletionCandidates(newAssets);

    for (const k in deletionCandidates) {
      await deleteOldestFromList(deletionCandidates[k]);
    }
  });
}

export const CleanUp = cleanUp();
