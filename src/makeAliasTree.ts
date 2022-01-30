import objectPath from "object-path";
// usage
import usage from "./data/css-property-usage.json";
import { TAliasTree } from "./types";

export function makeAliasTree(propertyList: string[]) {
  /* Generate tree of property names for use later */
  let props: [string, number][] = propertyList.map((prop) => [
    prop,
    prop.split("-").length,
  ]);
  props.sort((a, b) => a[1] - b[1]);
  const tree = {};
  for (let prop of props) {
    let [name] = prop;
    objectPath.set(tree, name.split("-").join("."), {});
  }

  const scores: Record<string, number> = {};

  for (const website of Object.keys(usage)) {
    const propertyUsage = usage[website as keyof typeof usage] as Record<
      string,
      number
    >;
    for (let k of Object.keys(propertyUsage)) {
      let valid = k.toLowerCase();
      if (propertyList.includes(valid)) {
        if (!scores[valid]) scores[valid] = 0;
        scores[valid] += propertyUsage[k];
      }
    }
  }

  // Hoist scores up by word partial
  const combinedScores: Record<string, number> = {};

  function getChildrenScore(property: string) {
    const children = propertyList.filter(
      (x) => x.startsWith(property) && x !== property
    );
    let score = 0;
    for (let child of children) {
      score += scores?.[child] ?? 0;
      score += getChildrenScore(child);
    }
    return score;
  }

  for (let property of propertyList) {
    // break it into parts
    const parts = property.split("-");
    for (let i = 0; i < parts.length; i++) {
      const currentSubsection = parts.slice(0, i + 1).join("-");
      if (!(currentSubsection in combinedScores)) {
        combinedScores[currentSubsection] =
          (scores?.[currentSubsection] ?? 0) +
          getChildrenScore(currentSubsection);
      }
    }
  }

  function recursiveLetterChoice(t = tree) {
    let collectAliases: TAliasTree = {};
    let used: string[] = [];
    let keys = Object.keys(t);
    // sort keys by score in combinedScores
    keys = keys.sort((a, b) => {
      let bScore = combinedScores[b] ?? 0;
      let aScore = combinedScores[a] ?? 0;
      if (bScore === aScore) {
        // return localeCompare(a, b);
        return a.localeCompare(b);
      }
      return bScore - aScore;
    });

    for (let key of keys) {
      let length = 1;
      while (used.includes(key.slice(0, length))) {
        length++;
      }
      used.push(key.slice(0, length));
      collectAliases[key] = {
        by: key.slice(0, length),
        children: recursiveLetterChoice(t[key as keyof typeof t]),
      };
    }
    return collectAliases;
  }

  return recursiveLetterChoice();
}
