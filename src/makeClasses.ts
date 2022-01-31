import { TAliasTree } from "./types";

type ClassItem = {
  className: string;
  properties: string[];
  fallback: string;
};

export function makeClasses(propertyList: string[], aliasTree: TAliasTree) {
  let classes: ClassItem[] = [];

  function addClass(className: string, properties: string[], fallback: string) {
    classes.push({
      className,
      properties,
      fallback,
    });
  }

  function makeFallbackString(stringArray: string[]) {
    let arr = stringArray.slice(0);
    let str = "";
    while (arr.length) {
      // pop off last element of arr
      let last = arr.pop();
      if (!str) {
        str = "var(" + last + ")";
      } else {
        str = "var(" + last + ", " + str + ")";
      }
    }
    return str;
  }

  function recursiveTree(
    tree = aliasTree,
    prefix = "",
    prefixBy = "",
    fallback: string[] = []
  ) {
    for (let key in tree) {
      let fb: string[] = fallback.slice(0);
      // check if property
      if (propertyList.includes(prefix + key)) {
        fb = ["--" + prefixBy + tree[key].by, ...fallback].filter(Boolean);
        let classNameAndCSSVar = prefixBy + tree[key].by;
        if (classNameAndCSSVar == null) throw new Error("Something went wrong");
        let properties = [prefix + key];
        if (properties[0] === "background-clip") {
          properties.push("-webkit-background-clip");
        }
        addClass(
          prefixBy + tree[key].by,
          properties,
          `var(--${classNameAndCSSVar})`
        );
        // addClass(prefixBy + tree[key].by, properties, makeFallbackString(fb));
      }
      // check if children
      if (tree[key].children) {
        recursiveTree(
          tree[key].children,
          prefix + key + "-",
          prefixBy + tree[key].by + "-",
          fb
        );
      }
    }
  }

  recursiveTree();

  return classes;
}
