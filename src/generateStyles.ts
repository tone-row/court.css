import classes from "./data/classes.json";
import { modifiers } from "./modifiers";

export function generateStyles() {
  const rawClassStyles = classes
    .map(({ className, property, fallback }) => {
      return `.${className} {\n\t${property}: var(${["--" + className, fallback]
        .filter(Boolean)
        .join(", ")});\n}`;
    })
    .join("\n");

  const modifiedClassStyles = classes
    .map(({ className, property, fallback }) => {
      return modifiers
        .map(({ modifier, modify }) => {
          return modify(`.${className}_${modifier}`).replace(
            "%",
            `{
              ${property}: var(${["--" + className + "_" + modifier, fallback]
              .filter(Boolean)
              .join(", ")});

      }`
          );
        })
        .join("\n");
    })
    .join("\n");

  return [rawClassStyles, modifiedClassStyles].join("\n");
}
