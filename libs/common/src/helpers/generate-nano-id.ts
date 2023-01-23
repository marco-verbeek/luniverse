import { customAlphabet } from 'nanoid';

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const customNanoId = customAlphabet(alphabet, 21);

// Example: "nLTPuufiw1Nk1k5VVCcA7"
// With 1000 UIDs generated per minute:
// ~107 billion years needed, in order to have a 1% probability of at least one collision
export const nanoid = () => customNanoId();
