
/**
 * ref: https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
 */

const toCamel = s => s.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));

const toSnake = s => {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('_').toLowerCase();
};

const isArray = a => Array.isArray(a);

const isObject = o => o === Object(o) && !isArray(o) && typeof o !== 'function';

export const camelize = o => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = camelize(o[k]);
    });
    return n;
  } if (isArray(o)) {
    return o.map(i => camelize(i));
  }

  return o;
};

export const decamelize = o => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toSnake(k)] = decamelize(o[k]);
    });
    return n;
  } if (isArray(o)) {
    return o.map(i => decamelize(i));
  }

  return o;
};

export const parseToJson = o => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      if (o[k] === '' || o[k] === null) {
        // Ignore empty values
        n[k] = o[k];
      } else {
        n[k] = parseToJson(o[k]);
      }
    });
    return n;
  } if (isArray(o)) {
    return o.map(i => parseToJson(i));
  }
  return JSON.parse(o.toString());
};

 function lowerCase (data) {
  JSON.parse(JSON.stringify(data, function(a, b) {
    return typeof b === "string" ? b.toLowerCase() : b
  }));
}
