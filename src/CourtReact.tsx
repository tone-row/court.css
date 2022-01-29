import React from "react";
import { CourtCssProps } from "./CourtCssProps.generated";

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithoutRef on its own
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {}
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>;

type WithModifierSuffixes<s extends string> =
  | `${s}_hover`
  | `${s}_active`
  | `${s}_focus`;

type AddModifiers<T> = T & {
  [s in keyof T & string as WithModifierSuffixes<s>]?: T[s];
};

type CourtComponentProps<C extends React.ElementType> =
  PolymorphicComponentProps<C, AddModifiers<CourtCssProps>>;

const classNameRegex2 = /^\$(?<classname>[a-z-]+(_(?<modifier>\w+))?)$/g;

const interceptor: {
  [K in keyof CourtCssProps]: (
    pre: CourtCssProps[K]
  ) => string | number | undefined;
} = {};

export function intercept<K extends keyof CourtCssProps>(
  key: K,
  fn: (pre: CourtCssProps[K]) => string | number | undefined
) {
  interceptor[key] = fn;
}

export function CourtReact<C extends React.ElementType = "div">({
  as,
  ...props
}: CourtComponentProps<C>) {
  let X = as || "div";

  let [_style, _props, _classes] = Object.keys(props).reduce<
    [Record<string, any>, Record<string, any>, string[]]
  >(
    ([s, p, c], key: any) => {
      if (key[0] === "$") {
        try {
          classNameRegex2.lastIndex = 0;
          let { groups } = classNameRegex2.exec(key) as unknown as {
            groups: { classname: string; modifier: string };
          };
          let { classname } = groups; // modifier not used

          // always add class
          c = c.concat([classname]);

          if (props[key] != null) {
            let baseKey: keyof CourtCssProps = key.split("_")[0];
            let intercept = interceptor[baseKey];
            let value = props[key];
            if (intercept) value = intercept(value) as any;

            // only add css property if string
            if (value != null) {
              s["--" + classname] = value;
            }
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
    <X
      {..._props}
      className={[props.className, ..._classes].join(" ")}
      style={{ ..._style, ...props.style }}
    />
  );
}

export default CourtReact;

// export function create(process: <T extends keyof M>(key: T, processProps: M[T]) => any) {
//   return function CourtReact<C extends React.ElementType = "div">({
//     as,
//     ...props
//   }: CourtComponentProps<C>) {
//     let X = as || "div";

//     let [_style, _props, _classes] = Object.keys(props).reduce<
//       [Record<string, any>, Record<string, any>, string[]]
//     >(
//       ([s, p, c], key: any) => {
//         if (key[0] === "$") {
//           try {
//             classNameRegex2.lastIndex = 0;
//             let { groups } = classNameRegex2.exec(key) as unknown as {
//               groups: { classname: string; modifier: string };
//             };
//             let { classname } = groups; // modifier not used

//             // always add class
//             c = c.concat([classname]);

//             // only add css property if string
//             if (props[key] != null) {
//               let value = process(key, props[key]);
//               if (["string", "number"].includes(typeof props[key])) {
//                 s["--" + classname] = value;
//               }
//             }
//           } catch {
//             console.log(`Error on ${key}`);
//           }
//           return [s, p, c];
//         }

//         // Add normal props
//         p[key] = props[key];
//         return [s, p, c];
//       },
//       [{}, {}, []]
//     );

//     return (
//       <X
//         {..._props}
//         className={[props.className, ..._classes].join(" ")}
//         style={{ ..._style, ...props.style }}
//       />
//     );
//   };
// }
