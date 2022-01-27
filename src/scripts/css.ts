import * as fs from "fs";
import { generateStyles } from "../generateStyles";
import { minify } from "csso";

const css = generateStyles();

// create dist folder if none existant
if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

// write css to dist folder
fs.writeFileSync("./dist/court.css", minify(css).css);
