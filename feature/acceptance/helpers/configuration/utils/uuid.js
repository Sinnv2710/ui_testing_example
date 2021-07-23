import * as bigintConversion from 'bigint-conversion';
import { unparse } from 'uuid-parse';

function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

export const bigIntegerToUUID = bigint => {
  const buf = toBuffer(bigintConversion.bigintToBuf(BigInt(bigint)));
  return unparse(buf);
};
