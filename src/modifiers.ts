export const modifiers = [
  {
    modifier: "hover",
    modify: (className: string) => `${className}:hover %`,
  },
  {
    modifier: "focus",
    modify: (className: string) => `${className}:focus %`,
  },
  {
    modifier: "active",
    modify: (className: string) => `${className}:active %`,
  },
];
