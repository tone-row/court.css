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

There are 9 ZILLION approaches to styling in modern frontend tooling. This is another one. It's better and worse than others depending on your needs. It's similar to tailwind but <span style="color: green">doesn't need to be compiled</span>. It requires <span style="color: red">more runtime memory than tailwind</span> because it convert component props to css custom vars and classes, but <span style="color: green">less memory than CSS-in-JS options</span> like styled-components, because it doesn't need to write styles to the `<head>`. It's <span style="color: green">generally smaller</span> than other styling solutions because of how heavily it leverages css custom properties.

Ultimately – I felt this was an interesting idea that represents an interesting middle ground in frontend styling techniques. Try it out! Use it if it works for you.

## Basic Concepts

1. **court.css** uses <u>one stylesheet</u> and <u>one component</u>.
1. Each one of the component's props</u> applies to <u>one css property</u>.
1. All component props expect strings unless they've been _intercepted_.
1. Component prop names follow a simple rule

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

### TO DO

- ~~come up with property names algorithmically following a process something like...~~
- ~~add types, polymorphism~~
- ~~missing modifier props in types~~
- ~~add active modifier~~
- make sure Court component props are exported and easy to compose
- add ability to intercept runtime processing
- add ability to intercept CSS generation... _maybe_
- remove unused classes
- add autoprefixer to final css
