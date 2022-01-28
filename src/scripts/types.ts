import classes from "../data/classes.json";
import * as fs from "fs";

let t = `/* DO NOT EDIT. Generate with yarn generate:types */\n\nexport type CourtCssProps = {\n  ${classes
  .map(({ className, property, fallback }) => {
    return `/** \n   * ${property}\n   *\n   * \`${fallback}\` */\n  "${className}": string;`;
  })
  .join("\n  ")}\n}`;

// write to file
fs.writeFileSync("./src/CourtCssProps.generated.ts", t);
