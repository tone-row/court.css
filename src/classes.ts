export const classes = [
  {
    className: "rad",
    properties: ["border-radius"],
    fallback: "var(--default-r, 0)",
  },
  {
    className: "pad",
    properties: ["padding"],
    fallback: "0",
  },
  {
    className: "pad-y",
    properties: ["padding-top", "padding-bottom"],
    fallback: "var(--pad, 0)",
  },
  {
    className: "pad-x",
    properties: ["padding-left", "padding-right"],
    fallback: "var(--pad, 0)",
  },
  {
    className: "bg",
    properties: ["background"],
  },
  {
    className: "weight",
    properties: ["font-weight"],
  },
  {
    className: "c",
    properties: ["color"],
  },
  {
    className: "display",
    properties: ["display"],
  },
  {
    className: "transition",
    properties: ["transition"],
    fallback: "var(--default-transition)",
  },
  {
    className: "outline",
    properties: ["outline"],
  },
];
