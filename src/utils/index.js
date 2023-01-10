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

export function genPadStart(val, len) {
  if (typeof val === "number") {
    val = val + "";
  }

  return val.padStart(len, "0");
}


export const getURLParameters = url => {
  const newUrl = url.match(/([^?=&]+)(=([^&]*))/g);
  
  return (newUrl || []).reduce((a, v) => {
      const index = v.indexOf('=');
      a[v.slice(0, index)] = v.slice(index + 1);
      
      return a;
  },{})
}