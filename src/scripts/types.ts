import classes from "../data/classes.json";
import * as fs from "fs";

let t = `/* DO NOT EDIT. Generate with yarn generate:types */\n\nexport type CourtComponentProps = {\n  ${classes
  .map(({ className, properties, fallback }) => {
    return `/** \n   * ${properties[0]}\n   *\n   * \`${fallback}\` */\n  "$${className}"?: string | number;`;
  })
  .join("\n  ")}\n}`;

// write to file
fs.writeFileSync("./src/CourtComponentProps.generated.ts", t);
