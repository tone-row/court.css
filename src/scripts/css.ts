import * as fs from "fs";
import { minify } from "csso";
import { makeCssString } from "../makeCssString";
import { makeClasses } from "../makeClasses";
import { makeAliasTree } from "../makeAliasTree";
import propertyList from "../data/all-properties.json";
import { resolve } from "path";
import { CourtConfig } from "../types";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// get CLI arguments
const args = process.argv.slice(2);

// use default config file if none is specified
const configPath = resolve(process.cwd(), args[0] || "src/config.js");
const config: CourtConfig = require(configPath);

const fileteredPropertyList = propertyList.filter(
  (property) => !config.exclude.some((regex) => regex.test(property))
);

const aliasTree = makeAliasTree(fileteredPropertyList);
const classes = makeClasses(fileteredPropertyList, aliasTree);
// write to file
fs.writeFileSync("./src/data/classes.json", JSON.stringify(classes, null, 2));

const css = makeCssString(classes);

// create dist folder if none existant
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

let prefixedCss = postcss([autoprefixer]).process(css).css;

// write css to dist folder
fs.writeFileSync("./dist/court.css", minify(prefixedCss).css);
