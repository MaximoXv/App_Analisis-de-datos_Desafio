/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "vitest";
import { calculateAverage } from "./calculate-average";

describe("calculateAverage function", () => {
  test("returns the average of a number array", () => {
    expect(calculateAverage([3, 5, 10])).toBe(6);
    expect(calculateAverage([3, 3, 3])).toBe(3);
    expect(calculateAverage([33, 51, 12])).toBe(32);
  });

  test("rounds the average to 4 decimal places", () => {
    expect(calculateAverage([1.123456, 2.345678])).toBe(1.7346);
  });

  test("correctly calculates the average regardless of the order", () => {
    expect(calculateAverage([10, 5, 0])).toBe(5);
  });

  test("throws an error if there are non-numeric elements", () => {
    expect(() => calculateAverage([1, "2" as any])).toThrowError(
      "Todos los elementos deben ser números."
    );
    expect(() => calculateAverage([true as any, 3])).toThrowError(
      "Todos los elementos deben ser números."
    );
    expect(() => calculateAverage([{} as any, 5])).toThrowError(
      "Todos los elementos deben ser números."
    );
  });

  test("throws an error if the input is not an array", () => {
    expect(() => calculateAverage("no array" as any)).toThrowError(
      "El valor debe ser un array"
    );
    expect(() => calculateAverage({} as any)).toThrowError(
      "El valor debe ser un array"
    );
  });

  test("throws an error if the array contains NaN", () => {
    expect(() => calculateAverage([1, NaN])).toThrowError(
      "Todos los elementos deben ser números."
    );
  });
});
