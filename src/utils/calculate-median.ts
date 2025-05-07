import { validateArrayAndSort } from "./validate-numeric-array-and-sort";

export const calculateMedian = (numbers: number[])=>{
    const numbersValidated = validateArrayAndSort(numbers);
    
    if(numbersValidated.length % 2 == 0){
        const numberRounded = (numbersValidated.length)/2;
        const median = (numbersValidated[numberRounded]+numbersValidated[numberRounded-1])/2;
        return Math.round(median * 1e4)/1e4;
        
    }else{
        const numberRounded = (numbersValidated.length - 1)/2;
        const median = numbersValidated[numberRounded];
        return Math.round(median * 1e4)/1e4
    }

}