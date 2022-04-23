/**
 * Generates a random integer between min and max (inclusive)
 * @param  {number} min
 * @param  {number} max
 * @returns randomly generated integer
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random integer array between min and max (inclusive)
 * @param  {number} min
 * @param  {number} max
 * @param  {number} length
 * @returns randomly generated integer array
 */
const randomIntArray = (
  min: number,
  max: number,
  length: number
): Array<number> => {
  const array: Array<number> = [];
  for (let i = 0; i < length; i++) {
    array.push(randomInt(min, max));
  }
  return array;
};

export const useMath = () => {
  return { randomInt, randomIntArray };
};
