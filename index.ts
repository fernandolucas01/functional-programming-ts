import * as path from "path";
import { symbols } from "./symbols";

import {
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
} from "./services";

const subtitlesPath = path.join(__dirname, "subtitles")

const mostUsedWords = composition(
  readDirectory,
  wordsEndingWith(".srt"),
  readFiles,
  mergeElements,
  separateTextBy("\n"),
  removeElementsIfEmpty,
  removeElementsIfInclude("-->"),
  removeNumbers,
  removeSymbols(symbols),
  mergeElements,
  separateTextBy(" "),
  removeElementsIfEmpty,
  removeNumbers,
  groupElements,
  orderByNumericAttribute("number"),
  saveJSON("data"),
);

mostUsedWords(subtitlesPath);