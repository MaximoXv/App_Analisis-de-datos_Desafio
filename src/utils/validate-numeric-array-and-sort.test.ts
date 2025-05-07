/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';
import { validateArrayAndSort } from './validate-numeric-array-and-sort';

describe('validateArrayAndSort function', () => {
  test('It returns valid numbers sorted in ascending order', () => {
    expect(validateArrayAndSort([3, 1, 2])).toEqual([1, 2, 3]);
    expect(validateArrayAndSort([3, -1, 2])).toEqual([-1, 2, 3]);
    expect(validateArrayAndSort([3, 1.5, 1.3, 2])).toEqual([1.3, 1.5, 2, 3]);
  });


  test('It throws an error if there are non-numeric elements', () => {
    expect(() => validateArrayAndSort([1, "2" as any])).toThrowError(
      "Todos los elementos deben ser números."
    );
    expect(() => validateArrayAndSort([true as any, 3])).toThrowError(
      "Todos los elementos deben ser números."
    );
    expect(() => validateArrayAndSort([{} as any, 5])).toThrowError(
      "Todos los elementos deben ser números."
    );
  });

  test('It throws an error if the input is not an array', () => {
    expect(() => validateArrayAndSort("no array" as any)).toThrowError(
        "El valor debe ser un array"
    );
    expect(() => validateArrayAndSort({} as any)).toThrowError(
        "El valor debe ser un array"
    );
  });

  test('It throws an error if the array contains NaN', () => {
    expect(() => validateArrayAndSort([1, NaN])).toThrowError(
      "Todos los elementos deben ser números."
    );
  });
});
