<div align="center">
  
# court.css

Tailwind-like CSS-in-JS with a predictable API, no compilation step, good typing, and a small footprint.  Made by [**Tone Row**](https://twitter.com/tone_row_)
  


</div>

## Getting Started

```bash
npm i court.css
```

## Basic Usage
```tsx
import "court.css/stylesheet"; // import stylesheet
import Box from "court.css"; // import component

export default function App() {
  return (
    <Box
      as="h1"
      $f-f="Comic Sans MS"
      $c="blue"
      $t-s="3px 3px lime"
      $b="dashed red"
      $p="5px"
    >
      What's the gist?
    </Box>
  );
}

// Codesandbox Link 👉 https://codesandbox.io/s/court-css-example-640dk?file=/src/App.js:0-332
```

![Gist](https://i.ibb.co/dMbyLV2/Screen-Shot-2022-01-30-at-12-53-23-PM.png)

- ### 1 Stylesheet + 1 Component
  Add the stylesheet, import the polymorphic component and you're off to the races
- ### 1 CSS Property = 1 Box prop
  No helpers to learn, just CSS with the property names shorterned
- ### Programmatic Prop Names
  The name for the css property _border_ is `$b`. _border-top_ is `$b-t` and _border-right_ `$b-r`. _border-radius_ is `$b-ra` – we add one letter from the word _radius_ because the `r` was already used for _border-right_. Another example is background, it's `$ba` because `$b` is used for border.
- ### Psuedo-states use underscore
  `$ou_focus` = _outline_ when focused. `$bo-s_hover` = _box-shadow_ when hovered.

## This is crazy, I could just use **\_**

OMG you're right! What was I thinking!?

![teddy bear committing suicide](https://media0.giphy.com/media/vkwAeqMEUSaoU/giphy.gif?cid=ecf05e47ebd1a1jwry1bm2h6b354kegtp9poux67jg77vbfo&rid=giphy.gif&ct=g)

## Motivation

There are 9 zillion approaches to styling. This is another one. Depending on your needs, it's better AND worse than others. It's similar to tailwind but doesn't need to be compiled. It requires more runtime memory than tailwind because it converts props to classes & css variables, but less memory than CSS-in-JS options like styled-components, because it doesn't need to write styles to the `<head>`. It's generally smaller than other styling solutions because of how heavily it leverages css custom properties.

Most importantly, I thought this was a funny idea so I built it. Try it out. Use it if it works for you.

#### Why court.css?

For the French word _court_ meaning short or brief.

## API

### CourtComponent (default)

```
import C from 'court.css'
```
Full list of CSS props here [src/CourtComponentProps.generated.ts](src/CourtComponentProps.generated.ts)

It's polymorphic (can be any html element), with the `as` prop.
```
<C as="marquee">I'm a marquee</C>
```
### intercept

Use intercept to intercept prop values and replace them with anything. Use this to implement t-shirt sizing, module types scales, color palettes... anything.

```tsx
import "court.css/stylesheet";
import Box, { intercept } from "court.css";

/* 👇 intercept font size and implement t-shirt sizing */

intercept("$f-s", (size) => {
  switch (size) {
    case "sm":
      return "12px";
    case "md":
      return "16px";
    case "lg":
      return "24px";
    case "xl":
      return "32px";
    default:
      return size;
  }
});

function App() {
  return (
    <>
      <Box $f-s="sm">Small</Box>
      <Box $f-s="md">Medium</Box>
      <Box $f-s="lg">Large</Box>
      <Box $f-s="xl">Extra Large</Box>
    </>
  );
}

// Sandbox Link 👉 https://codesandbox.io/s/court-css-intercept-example-olwpg?file=/src/App.js
```

## Working in Typescript
```tsx
import "court.css/stylesheet";
import Box, { CourtProps } from "court.css";

function Button(props: CourtProps<"button">) {
  return <Box as="button" $f-f="cursive" $f-s="2rem" {...props} />;
}

export default function App() {
  return (
    <div className="App">
      <Button>Hello</Button>
      <Button onClick={() => alert("Ciao")}>Goodbye</Button>
    </div>
  );
}
// Sandbox Link 👉 https://codesandbox.io/s/court-css-typescript-3fr4t?file=/src/App.tsx
```

## Roadmap

- Add polymorphic component for friends: vue, svelte, preact, lit
- Allow users to generate CSS themselves (or add it at runtime) and alter class generation and modifiers

## Contributing

If you find bugs please open an issue. If you there is some functionality you would like to add please open an issue to discuss before making a pull request.
