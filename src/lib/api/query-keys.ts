export type QueryKeyBuilder = (...segments: Array<string | number>) => ReadonlyArray<string>;

export const createQueryKeys = (entity: string): QueryKeyBuilder => {
  return (...segments) => [entity, ...segments.map(String)];
};
