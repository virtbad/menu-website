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
 * @param tag tag of the user
 *
 * @returns string
 */

export const colorForTag = (uuid: string): string => {
  let h = (parseInt(Number("0x" + SHA256(uuid).toString().substring(0, 6)).toString(), 10) / 16777215) * 360; // h / 360
  // check whether hue isn't in the green color spectrum
  if (h < 90) while (h < 90) h *= 1.1;
  else if (h > 130) while (h > 130) h /= 1.1;

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

/**
 * Function to get a translated error message for a http status code
 *
 * @param code http status code
 *
 * @returns detailed error explaination
 */

export const getErrorMessage = (code: number): { title: string; description: string; href: string } => {
  let title = "";
  let description = "";
  switch (code) {
    case 400:
      title = "Ungültige Anfrage";
      description = "Es ist ein Fehler bei der Anfrage aufgetreten";
      break;
    case 401:
      title = "Unauthentifiziert";
      description = "Dir fehlen die benötigten Berechtigungen für diese Ressource";
      break;
    case 403:
      title = "Verboten";
      description = "Dir fehlen die benötigten Berechtigungen für diese Ressource";
      break;
    case 404:
      title = "Nicht gefunden";
      description = "Die angeforderte Ressource konnte nicht gefunden werden";
      break;
    case 500:
      title = "Serverseitiger Fehler";
      description = "Es ist ein serverseitiger Fehler aufgetreten. Versuche es später erneut.";
      break;
    default:
      title = "Fehler";
      description = "Es ist ein fehler bei der Anfrage aufgetreten";
      break;
  }
  return { title: title, description: description, href: `https://developer.mozilla.org/de/docs/web/http/status/${code}` };
};

/**
 * Function to convert a hex color to a hsl object
 *
 * @param hex input hex color
 *
 * @returns object
 */

export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  hex = hex.replace("#", "").trim();
  if (hex.length !== 6) hex = "ffffff";

  const result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r: number = parseInt(result[1], 16);
  let g: number = parseInt(result[2], 16);
  let b: number = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  let max: number = Math.max(r, g, b);
  let min: number = Math.min(r, g, b);

  let h: number;
  let s: number;
  let l: number = (max + min) / 2;

  if (max == min) h = s = 0;
  else {
    let d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return { h: h, s: s, l: l };
};

/**
 * Function to convert a potential axios error to a string message
 *
 * @param e potential error
 *
 * @returns string representation
 */

export const convertAxiosErrorString = (e: any): string => {
  return `${e?.message || "Unknown message"}\n${e?.response?.data?.message || "No error message"}`;
};
