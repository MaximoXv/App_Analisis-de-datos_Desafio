/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";
import { calculateStandardDeviation } from "./calculate-standard-deviation";

describe("calculateStandardDeviation function",()=>{
    test("calculates the standard deviation of an array of numbers",()=>{
        expect(calculateStandardDeviation([2,4,6,8,10])).toBe(2.8284);
        expect(calculateStandardDeviation([1,2,4,6,8,10,20])).toBe(5.9693);
    })

    test("calculates the standard deviation of an array of numbers regardless of the order",()=>{
        expect(calculateStandardDeviation([2,4,10,8,6])).toBe(2.8284);
        expect(calculateStandardDeviation([1,2,20,6,8,10,4])).toBe(5.9693);
    })

    test("calculates the standard deviation of an array of decimal numbers",()=>{
        expect(calculateStandardDeviation([2,4.76,6.13,8.30,10])).toBe(2.7771);
    })

    test('throws an error if there are non-numeric elements', () => {
        expect(() => calculateStandardDeviation([1, "2" as any])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateStandardDeviation([true as any, 3])).toThrowError(
          "Todos los elementos deben ser números."
        );
        expect(() => calculateStandardDeviation([{} as any, 5])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });
    
      test('throws an error if the input is not an array', () => {
        expect(() => calculateStandardDeviation("no array" as any)).toThrowError(
            "El valor debe ser un array"
        );
        expect(() => calculateStandardDeviation({} as any)).toThrowError(
            "El valor debe ser un array"
        );
      });
    
      test('throws an error if the array contains NaN', () => {
        expect(() => calculateStandardDeviation([1, NaN])).toThrowError(
          "Todos los elementos deben ser números."
        );
      });

})