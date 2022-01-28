# court.css

A **work in progress ⚠️** jsx-based CSS utility framework with a predictable API, good typing, and a small footprint.

## Getting Started

`npm i court.css`

### React

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
- add ability to intercept processing
- add ability to intercept CSS generation... _maybe_
- remove unused classes
