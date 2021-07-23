export const hexToBase64 = hexString => Buffer.from(hexString, 'hex').toString('base64');

export const base64ToBase64Url = base64 => base64
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

export const hexToBase64Url = hexString => {
  const base64 = hexToBase64(hexString);
  return base64ToBase64Url(base64);
};

const toBuffer = ab => {
  let binary = '';
  const bytes = new Uint8Array(ab);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // eslint-disable-next-line no-undef
  return window.btoa(binary);
};

export const bufferToBase64 = buffer => buffer.toString('base64');

export const bufferToBase64Url = buffer => {
  const base64 = bufferToBase64(buffer);
  return base64ToBase64Url(base64);
};

export const arrayBufferToBase64 = ab => {
  const buf = toBuffer(ab);
  return bufferToBase64(buf);
};

export const arrayBufferToBase64Url = ab => {
  const buf = toBuffer(ab);
  return bufferToBase64Url(buf);
};
