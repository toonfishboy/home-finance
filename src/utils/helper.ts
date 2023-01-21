/**
 * Round the number by a given amount of decimal digits
 * @param number - number that is rounded
 * @param length . count of decimal digits to which the number should be rounded
 * @returns 
 */
export function roundDecimals(number: number, length: number = 2): number {
  return Math.round(number * Math.pow(10, length)) / Math.pow(10, length);
}
