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
