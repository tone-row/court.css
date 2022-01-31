import * as fs from "fs";
import { makeCssString } from "../makeCssString";
import { makeClasses } from "../makeClasses";
import { makeAliasTree } from "../makeAliasTree";
import propertyList from "../data/all-properties.json";
import { resolve } from "path";
import { CourtConfig } from "../types";
import parcelCss from "@parcel/css";

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

let { code } = parcelCss.transform({
  filename: "court.css",
  code: Buffer.from(css),
  minify: true,
  sourceMap: true,
  targets: {},
});

fs.writeFileSync("./dist/court.css", code);
