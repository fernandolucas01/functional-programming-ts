import * as path from "path";
import { symbols } from "./symbols";

import {
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
} from "./services";

readDirectory(path.join(__dirname, "subtitles"))
  .then(wordsEndingWith(".srt"))
  .then(readFiles)
  .then(mergeElements)
  .then(separateTextBy("\n"))
  .then(removeElementsIfEmpty)
  .then(removeElementsIfInclude("-->"))
  .then(removeNumbers)
  .then(removeSymbols(symbols))
  .then(mergeElements)
  .then(separateTextBy(" "))
  .then(removeElementsIfEmpty)
  .then(removeNumbers)
  .then(groupElements)
  .then(orderByNumericAttribute("number"))
  .then(saveJSON("data"));