export function isObject(item: unknown): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

export default function deepMerge<T extends object, R extends object>(target: T, source: R): T {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    if (isObject(source[key])) {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  });

  return output;
}
