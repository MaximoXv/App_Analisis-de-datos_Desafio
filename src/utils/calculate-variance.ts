import { calculateAverage } from "./calculate-average";
import { validateArrayAndSort } from "./validate-numeric-array-and-sort";

export const calculateVariance = (numbers: number[]) => {
    const validNumbers = validateArrayAndSort(numbers);
    
    const average = calculateAverage(validNumbers);
    const variance = validNumbers.reduce((acc,num)=> acc+((num-average)**2),0)/validNumbers.length

    return Math.round(variance * 1e4)/1e4;

}