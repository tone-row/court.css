const classNameRegex2 = /^\$(?<classname>[a-z-]+(_(?<modifier>\w+))?)$/g;

export function C({ as = "div", style = {}, className = "", ...props }) {
  let Component = as;
  let [_style, _props, _classes] = Object.keys(props).reduce<
    [Record<string, any>, Record<string, any>, string[]]
  >(
    ([s, p, c], key) => {
      if (key[0] === "$") {
        try {
          classNameRegex2.lastIndex = 0;
          let { groups } = classNameRegex2.exec(key) as unknown as {
            groups: { classname: string; modifier: string };
          };
          let { classname } = groups; // modifier not used

          // always add class
          c = c.concat([classname]);

          // only add css property if string
          if (typeof props[key] === "string") {
            s["--" + classname] = props[key];
          }
        } catch {
          console.log(`Error on ${key}`);
        }

        return [s, p, c];
      }

      // Add normal props
      p[key] = props[key];
      return [s, p, c];
    },
    [{}, {}, []]
  );
  return (
    <Component
      className={[className, ..._classes].join(" ")}
      style={{ ..._style, ...style }}
      {..._props}
    />
  );
}
