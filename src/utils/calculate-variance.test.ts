/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";
import { calculateVariance } from "./calculate-variance";

describe("calculateVariance function", ()=>{
    test("calculates the variance of a number array",()=>{
        expect(calculateVariance([2,4,6,8,10])).toBe(8);
        expect(calculateVariance([4,5,5,8,9,12,14,16,17,20])).toBe(28.6);
        expect(calculateVariance([12,16,17,20])).toBe(8.1875);
    })

    test("calculates the variance regardless of the order",()=>{
        expect(calculateVariance([2,8,10,4,6])).toBe(8);
        expect(calculateVariance([4,5,5,14,16,17,20,8,9,12])).toBe(28.6);
        expect(calculateVariance([17,20,12,16])).toBe(8.1875);
    })

    test("calculates the variance with negative numbers",()=>{
        expect(calculateVariance([-2,-4,6,8,10])).toBe(31.04);
        expect(calculateVariance([-4,-5,-5,8,9,12,14,16,17,20])).toBe(82.36);
        expect(calculateVariance([-12,-16,17,20])).toBe(267.1875);
    })

    test("calculates the variance with decimal numbers",()=>{
        expect(calculateVariance([1, 2.39, 3.61, 4, 5, 5.5])).toBe(2.3254);
    })

    test("verifies that the variance is rounded to 4 decimal places",()=>{
        expect(calculateVariance([1, 2, 3, 4, 5, 5.5])).toBe(2.5347);
    })

    test('throws an error if there are non-numeric elements', () => {
        expect(() => calculateVariance([1, "2" as any])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateVariance([true as any, 3])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateVariance([{} as any, 5])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });
    
      test('throws an error if the input is not an array', () => {
        expect(() => calculateVariance("no array" as any)).toThrowError(
            "El valor debe ser un array"
        );
        expect(() => calculateVariance({} as any)).toThrowError(
            "El valor debe ser un array"
        );
      });
    
      test('throws an error if the array contains NaN', () => {
        expect(() => calculateVariance([1, NaN])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });
})