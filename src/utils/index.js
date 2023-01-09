export function getRandom(min, max, excludes) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  const res = Math.floor(Math.random() * (max - min + 1) + min);
  if (!excludes.includes(res)) {
    return res;
  }

  return getRandom(min, max, excludes);
}
