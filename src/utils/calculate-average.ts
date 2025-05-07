import { validateArrayAndSort } from "./validate-numeric-array-and-sort";

export const calculateAverage = (numbers: number[]): number => {
  const validNumbers = validateArrayAndSort(numbers);

  const sum = validNumbers.reduce((acc, num) => acc + num, 0);

  const average = sum / validNumbers.length;
  
  return Math.round(average * 1e4)/1e4;
};
