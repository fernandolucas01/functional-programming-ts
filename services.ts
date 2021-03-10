import * as fs from "fs";
import * as path from "path";

function composition(...fns: Function[]) {
  return (valor) =>  fns.reduce(async (acc, fn) => {
    if (acc instanceof Promise)
      return fn(await acc);
    else
      return fn(acc);
  }, valor);
}

function readDirectory(dirPath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    try {
      const dirPaths = fs.readdirSync(dirPath);
      const filePaths = dirPaths.map(fileName => path.join(dirPath, fileName));
      resolve(filePaths);
    } catch (error) {
      reject(error);
    }
  });
}

function wordsEndingWith(txtPattern: string) {
  return (array: string[]) => array.filter(el => el.endsWith(txtPattern));
}

function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync((filePath), { encoding: "utf-8" });
      resolve(content.toString());
    } catch (e) {
      reject(e);
    }
  });
}

function readFiles(filePaths: string[]) {
  return Promise.all(filePaths.map(path => readFile(path)));
}

function mergeElements(array: string[]): string {
  return array.join(" ");
}

function separateTextBy(symbol) {
  return (text: string) => text.split(symbol);
}

function removeElementsIfEmpty(array: string[]): string[] {
  return array.filter(el => el.trim());
}

function removeElementsIfInclude(txtPattern: string) {
  return (array: string[]) => array.filter(el => !el.includes(txtPattern));
}

function removeNumbers(array): string[] {
  return array.filter((el) => isNaN(el));
}

function removeSymbols(symbols: string[]) {
  return array => array.map(el => {
    return symbols.reduce((acc, symbol) => acc.split(symbol).join(""), el);
  });
}

function orderByNumericAttribute(attr: string) {
  return array => [...array].sort((o1, o2) => o2[attr] - o1[attr]);
}

function groupElements(words: string[]):object[] {
  return Object.values(words.reduce((acc, word) => {
    const el = word.toLowerCase();
    const number = acc[el] ? acc[el].number + 1 : 1;
    acc[el] = { element: el, number };
    return acc;
  }, {}))
}

function saveJSON(fileName: string) {
  return (array: object[]) => {
    const data = JSON.stringify(array, null, 2);

    fs.writeFile(`${fileName}.json`, data, err => {
      if (err) throw err;
    });
  }
}

export {
  composition,
  readDirectory,
  wordsEndingWith,
  readFiles,
  mergeElements,
  separateTextBy,
  removeElementsIfEmpty,
  removeElementsIfInclude,
  removeNumbers,
  removeSymbols,
  orderByNumericAttribute,
  groupElements,
  saveJSON,
};