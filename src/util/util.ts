import { SHA256 } from "crypto-js";

/**
 * Function to make a debounced function
 *
 * @param handler handler function
 *
 * @param delay delay since last action
 *
 * @returns any
 */

export const debounce = <F extends (...args: any[]) => void>(handler: F, delay?: number) => {
  delay = delay || 100;
  let timeoutID: any = null;
  return function (this: any, ...args: Parameters<F>) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => handler.apply(this, args), delay);
  } as F;
};

/**
 * Function to make a debounced async function
 *
 * @param handler handler function
 *
 * @param delay delay since last action
 *
 * @returns Promise<any>
 */

export const debouncedPromise = <F extends (...args: any[]) => Promise<any>>(handler: F, delay?: number) => {
  const debounced = debounce((resolve: any, reject: any, args: Parameters<F>) => {
    handler(...args)
      .then(resolve)
      .catch(reject);
  }, delay);

  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args);
    }) as ReturnType<F>;
};

/**
 * Function to get the hex value for a specific uuid
 *
 * @param tag tag address of the user
 *
 * @returns string
 */

export const colorForSluz = (uuid: string): string => {
  let h = (parseInt(Number("0x" + SHA256(uuid).toString().substring(0, 6)).toString(), 10) / 16777215) * 360; // h / 360
  // check whether hue isn't in the green color spectrum
  if (h < 80) while (h > 140) h *= 1.1;
  else if (h > 140) while (h > 140) h /= 1.1;

  h /= 360;

  const s = 1; // s / 100
  const l = 0.65; // l / 100

  const convertHue = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const [r, g, b]: Array<number> = [convertHue(p, q, h + 1 / 3), convertHue(p, q, h), convertHue(p, q, h - 1 / 3)].map((x: number) => Math.round(x * 255));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Function to parse a cookie string to an object
 *
 * @param cookieString raw cookie string
 *
 * @returns object
 */

export const parseCookies = (cookieString: string): { [key: string]: any } => {
  return Object.fromEntries(cookieString.split("; ").map((x) => x.split(/=(.*)$/, 2).map(decodeURIComponent)));
};
