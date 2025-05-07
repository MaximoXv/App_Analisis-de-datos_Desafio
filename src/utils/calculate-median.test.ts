/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";
import { calculateMedian } from "./calculate-median";

describe("calculateMedian function",()=>{
    test("returns the median when the array has a middle value",()=>{
        expect(calculateMedian([0,2,4,5,10,15,20])).toBe(5);
        expect(calculateMedian([1,5,10,15,20])).toBe(10);
        expect(calculateMedian([15,17,20])).toBe(17);
        expect(calculateMedian([20])).toBe(20);
    })

    test("returns the median when the array length is not divisible by 2",()=>{
        expect(calculateMedian([0,2,15,20])).toBe(8.5);
        expect(calculateMedian([1,5,10,12,15,20])).toBe(11);
        expect(calculateMedian([15,17,21,25])).toBe(19);
        expect(calculateMedian([20,40])).toBe(30);
    })

    test("returns the median from an unsorted array of numbers",()=>{
        expect(calculateMedian([20,0,2,15])).toBe(8.5);
        expect(calculateMedian([10,1,20,5,12,15])).toBe(11);
        expect(calculateMedian([10,15,1,5,20])).toBe(10);
        expect(calculateMedian([20])).toBe(20);
    })

    test("returns the median from an unsorted array of decimals and integers",()=>{
        expect(calculateMedian([20.30,0.20,2.10,15.35])).toBe(8.725);
        expect(calculateMedian([1,5,10.2334,12.9324,15,20])).toBe(11.5829);
        expect(calculateMedian([1,5,10.987423897,15,20])).toBe(10.9874);
        expect(calculateMedian([20.10101111])).toBe(20.1010);
    })

    test("applies rounding to 4 decimal places when necessary", () => {
        expect(calculateMedian([1.123456, 1.123457])).toBe(1.1235); 
      });

    test('throws an error if there are non-numeric elements', () => {
        expect(() => calculateMedian([1, "2" as any])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateMedian([true as any, 3])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateMedian([{} as any, 5])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });
    
      test('throws an error if the input is not an array', () => {
        expect(() => calculateMedian("no array" as any)).toThrowError(
            "El valor debe ser un array"
        );
        expect(() => calculateMedian({} as any)).toThrowError(
            "El valor debe ser un array"
        );
      });
    
      test('throws an error if the array contains NaN', () => {
        expect(() => calculateMedian([1, NaN])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });
})