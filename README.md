# court.css

A **work in progress ⚠️** jsx-based CSS utility framework with a predictable API, good typing, and a small footprint.

## Getting Started

`npm i court.css`

### React

```tsx
// import stylesheet
import "court.css/stylesheet";

// import polymorphic component
import { CourtReact as Box } from "court.css";

function App() {
  return (
    <Box
      $b="solid 2px blue"
      $b-ra="10px"
      $d="grid"
      $p="10px"
      $ba="turquoise"
      $f-s="24px"
      $ma-w="500px"
      $m-i="auto"
      $m-t="20px"
      $bo-s="0 0 10px 2px yellow"
      $f-w="700"
    >
      Hello World
    </Box>
  );
}

export default App;
```

### TO DO

- ~~come up with property names algorithmically following a process something like...~~
- add types, polymorphism
- add ability to intercept processing
- add ability to intercept CSS generation... _maybe_
- remove unused classes
