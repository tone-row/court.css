<div align="center">
  
# court.css 🏰

A <u>JSX-based</u>, <u>CSS utility framework</u> with a predictable API, good typing, and a small footprint.
  
![npm](https://img.shields.io/npm/v/court.css)
![npm bundle size](https://img.shields.io/bundlephobia/min/court.css)
  
</div>

## Getting Started

```bash
npm i court.css
```

## Basic Usage

```tsx
import "court.css/stylesheet"; // import stylesheet
import { CourtReact as Box } from "court.css"; // import polymorphic component

function Gist() {
  return (
    <Box
      as="h1"
      $f-f="Comic Sans MS"
      $co="blue"
      $t-s="3px 3px lime"
      $b="dashed red"
      $p="5px"
    >
      What's the gist?
    </Box>
  );
}
```

![Gist](https://i.ibb.co/dMbyLV2/Screen-Shot-2022-01-30-at-12-53-23-PM.png)

- #### 1 stylesheet & 1 component
  Add the stylesheet, import the polymorphic component and you're off to the races
- #### 1 prop per css property
  No helpers to learn, just CSS with the property names shorterned
- #### prop names simplified from usage
  The name for the css property _border_ is `$b`. _border-top_ is `$b-t` and _border-right_ `$b-r`. _border-radius_ is `$b-ra` – we add one letter from the word _radius_ because the `r` was already used for _border-right_. Another example is background, it's `$ba` because `$b` is used for border.
- #### psuedo-selectors use underscore 
  `$ou_focus` = _outline_ when focused. `$bo-s_hover` = _box-shadow_ when hovered.
  
## This is crazy, I could just use _____

OMG you're right! What was I thinking!?

![teddy bear committing suicide](https://media0.giphy.com/media/vkwAeqMEUSaoU/giphy.gif?cid=ecf05e47ebd1a1jwry1bm2h6b354kegtp9poux67jg77vbfo&rid=giphy.gif&ct=g)

## Motivation

There are 9 zillion approaches to styling. This is another one. Depending on your needs, it's better AND worse than others. It's similar to tailwind but doesn't need to be compiled. It requires more runtime memory than tailwind because it converts props to classes & css variables, but less memory than CSS-in-JS options like styled-components, because it doesn't need to write styles to the `<head>`. It's generally smaller than other styling solutions because of how heavily it leverages css custom properties.

Most importantly, I thought this was a funny idea so I built it. Try it out. Use it if it works for you.

## Big Example

[Open in CodeSandbox](https://codesandbox.io/s/court-css-example-uudxu?file=/src/App.tsx)

```tsx
import { CourtReact as Box } from "court.css";
import "court.css/stylesheet";
import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="button"
      $f-s="30px"
      $p="5px"
      $p-i="20px"
      $b-ra="10px"
      $bo-s="2px 2px 3px rgba(0,0,0,0.5)"
      $ap="none"
      $b="0"
      $f-f="cursive"
      $ba="orange"
      $ba_hover="darkorange"
      $cu="pointer"
      $tra="all .2s ease"
    >
      {children}
    </Box>
  );
};

const Nav = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as="nav"
      $ga="10px"
      $ba="linear-gradient(to bottom, whitesmoke, lightgrey)"
      $b="solid 2px #ccc"
      $p="10px"
      $b-ra="10px"
      $d="inline-flex"
    >
      {children}
    </Box>
  );
};

export default function App() {
  return (
    <div className="App">
      <Box
        as="h1"
        $f-f="sans-serif"
        $f-w="700"
        $t-t="uppercase"
        $f-s="45px"
        $tr="scaleY(130%)"
        $b-b="wavy 4px red"
      >
        Hello court.css!
      </Box>
      <Nav>
        <Button>Button A</Button>
        <Button>Button B</Button>
        <Button>Button Sea</Button>
      </Nav>
    </div>
  );
}
```

## Intercept

court.css doesn't make any assumptions about the props your pass. Instead, if you want to implement an abstraction over specific properties, you can intercept them. Just make sure you do this before you use the component (, it may be a good idea to do all your `intercept`'s in one file, and re-export the component after). Here's an example that uses t-shirt sizing for font sizes.

```tsx
import "court.css/stylesheet";
import { CourtReact as Box, intercept } from "court.css";

// intercept font sizes
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
```

## Roadmap

- Make sure Court component props are exported and easy to compose
- Move the entire class generation process and data it's derived from into this repository
  - Remove unlikely classes (e.g., `content`)
- Add autoprefixer to final css
- Add polymorphic component for friends: vue, svelte, preact, lit
- Allow users to generate CSS themselves (or add it at runtime) and alter class generation and modifiers
