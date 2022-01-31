import React from "react";
import { CourtComponentProps } from "./CourtComponentProps.generated";

// All credit to Ben Ilegbodu
// https://www.benmvp.com/blog/polymorphic-react-components-typescript/
type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
  Omit<ExtendedProps, keyof OverrideProps>;

type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>;

type PolymorphicComponentProps<
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

export type CourtProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  AddModifiers<CourtComponentProps>
>;

const classNameRegex2 = /^\$(?<classname>[a-z-]+(_(?<modifier>\w+))?)$/g;

const interceptor: {
  [K in keyof CourtComponentProps]: (
    pre: CourtComponentProps[K]
  ) => string | number | undefined;
} = {};

export function intercept<K extends keyof CourtComponentProps>(
  key: K,
  fn: (pre: CourtComponentProps[K]) => string | number | undefined
) {
  interceptor[key] = fn;
}

export function CourtComponent<C extends React.ElementType = "div">({
  as,
  ...props
}: CourtProps<C>) {
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
            let baseKey: keyof CourtComponentProps = key.split("_")[0];
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
