# court.css 🏰

A (**work in progress**) <u>JSX-based</u>, <u>CSS utility framework</u> with a predictable API, good typing, and a small footprint.

![npm](https://img.shields.io/npm/v/court.css)

## Getting Started

```bash
npm i court.css

# or

yarn add court.css
```

## Usage

```tsx
// import the stylesheet
import "court.css/stylesheet";

// import the component
import { CourtReact as C } from "court.css";

// use the component
export function App() {
  return (
    // color blue & font-size: 1.5em
    <C $c="blue" $f-s="1.5em">
      Hello, world!
    </C>
  );
}
```

## Motivation

There are 9 ZILLION approaches to styling in modern frontend tooling. This is another one. It's better and worse than others depending on your needs. It's similar to tailwind but doesn't need to be compiled. It requires more runtime memory than tailwind because it converts component props to classes css custom properties, but less memory than CSS-in-JS options like styled-components, because it doesn't need to write styles to the `<head>`. It's generally smaller than other styling solutions because of how heavily it leverages css custom properties.

Ultimately – I felt this was an interesting idea that represents an interesting middle ground in frontend styling techniques. Try it out! Use it if it works for you.

## Basic Concepts

1. **court.css** uses <u>one stylesheet</u> and <u>one component</u>.
1. Each one of the component's props</u> applies to <u>one css property</u>.
1. All component props expect strings unless they've been _intercepted_.
1. Component prop names follow a simple rule
1. Psuedo-selectors (like hover, active, and focus) follow a simple rule

## Example

[Open in CodeSandbox](https://codesandbox.io/s/court-css-example-uudxu?file=/src/App.tsx)

```tsx
// import polymorphic component
import { CourtReact as Box } from "court.css";
// import stylesheet
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

## Intercept Props

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

### TO DO

- ~~come up with property names algorithmically following a process something like...~~
- ~~add types, polymorphism~~
- ~~missing modifier props in types~~
- ~~add active modifier~~
- ~~add ability to intercept runtime processing~~
- ~~add ability to intercept CSS generation... _maybe_~~
- make sure Court component props are exported and easy to compose
- remove unused classes
- add autoprefixer to final css
- Move the entire class generation process and data it's derived from into this repository
