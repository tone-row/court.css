export type TAliasTree = { [K: string]: { by: string; children: TAliasTree } };

export type CourtConfig = {
  /** Exclude CSS Properties to make stylesheet smaller */
  exclude: RegExp[];
};
