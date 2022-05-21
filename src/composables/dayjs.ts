import dayjs from "dayjs";

/**
 * Format a string
 *
 * @param input
 * @param format
 * @returns
 */
const format = (input: string, format: string = "DD/MM HH:mm"): string => {
  const parsed = dayjs(input);
  return parsed.format(format);
};

/**
 * Get past days as array for chart
 *
 * @param days
 * @param format
 * @returns
 */
const getDaysFromPast = (
  days: number = 30,
  format: string = "DD/MM"
): Array<any> => {
  const now = dayjs();
  const array = [];

  for (let i = 0; i <= days; i++) {
    array.push(now.subtract(days - i, "day").format(format));
  }

  return array;
};

export const useDayjs = () => {
  return { format, getDaysFromPast };
};
