const { sha256 } = require('@credify/crypto');

export const sha256ByEachField = o => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      if (k === 'verified') {
        // Ignore `verified` flag
        n[k] = o[k];
      } else if (o[k] === '' || o[k] === null) {
        // Ignore empty values
        n[k] = o[k];
      } else {
        n[k] = sha256ByEachField(o[k]);
      }
    });
    return n;
  } if (isArray(o)) {
    return o.map(i => sha256ByEachField(i));
  }

  return sha256(o);
};

export const isArray = a => Array.isArray(a);

export const isObject = o => o === Object(o) && !isArray(o) && typeof o !== 'function';
