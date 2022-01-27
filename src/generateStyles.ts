import { classes } from "./classes";
import { modifiers } from "./modifiers";

export function generateStyles() {
  const rawClassStyles = classes
    .map(({ className, properties, fallback }) => {
      return `.${className} {\n\t${properties
        .map(
          (property) =>
            `${property}: var(${["--" + className, fallback]
              .filter(Boolean)
              .join(", ")});`
        )
        .join("\n\t")} \n}`;
    })
    .join("\n");

  const modifiedClassStyles = classes
    .map(({ className, properties, fallback }) => {
      return modifiers
        .map(({ modifier, modify }) => {
          return modify(`.${className}_${modifier}`).replace(
            "%",
            `{
        ${properties
          .map(
            (property) =>
              `${property}: var(${["--" + className + "_" + modifier, fallback]
                .filter(Boolean)
                .join(", ")});`
          )
          .join("\n\t")}

      }`
          );
        })
        .join("\n");
    })
    .join("\n");

  return [rawClassStyles, modifiedClassStyles].join("\n");
}
