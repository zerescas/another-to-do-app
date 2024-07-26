/** Load Pinia's state from Local Storage by its key
 * Returns true if process ended successful
 * Returns false if something happened wrong
 * @param {string} storageKey
 * @returns {boolean}
 */
export function loadStateToLocalStorage(
  piniaInstance: any,
  propertiesToLoad: Array<string>,
  storageKey: string,
): boolean {
  const stateJSON = localStorage.getItem(storageKey);

  if (!stateJSON) {
    return false;
  }

  try {
    const state = JSON.parse(stateJSON) as any;

    for (const propertyToLoad of propertiesToLoad) {
      if (!state[propertyToLoad]) {
        throw new Error(`${propertyToLoad} is not exists in localStorage's ${storageKey}`);
      }

      piniaInstance[propertyToLoad] = state[propertyToLoad];
    }
  } catch (error) {
    console.error(`localStorage's ${storageKey} is damaged - ${(error as Error).message}`);
    return false;
  }

  return true;
}
