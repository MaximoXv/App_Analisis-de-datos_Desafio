import { calculateVariance } from "./calculate-variance"

export const calculateStandardDeviation = (numbers: number[])=>{
    const variance = calculateVariance(numbers);
    
    const standardDeviation = Math.sqrt(variance);
    
    return Math.round(standardDeviation * 1e4)/1e4

}