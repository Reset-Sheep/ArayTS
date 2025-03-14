import { describe, test, expect } from '@jest/globals';
import ArrayUtils from '../array/array';

describe('ArrayUtils Tests', () => {
    describe('unique', () => {
        test('should remove duplicates from array', () => {
            expect(ArrayUtils.unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
        });
    });

    describe('flatten', () => {
        test('should flatten nested arrays', () => {
            expect(ArrayUtils.flatten([1, [2, 3], [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe('groupBy', () => {
        test('should group array by key', () => {
            const users = [
                { id: 1, role: 'admin' },
                { id: 2, role: 'user' },
                { id: 3, role: 'admin' }
            ];
            const result = ArrayUtils.groupBy(users, 'role');
            expect(result.admin.length).toBe(2);
            expect(result.user.length).toBe(1);
        });
    });

    describe('sortBy', () => {
        test('should sort array by multiple keys', () => {
            const users = [
                { name: 'John', age: 30 },
                { name: 'Jane', age: 25 },
                { name: 'John', age: 25 }
            ];
            const sorted = ArrayUtils.sortBy(users, 'name', 'age');
            expect(sorted[0]).toEqual({ name: 'Jane', age: 25 });
        });
    });

    describe('chunk', () => {
        test('should split array into chunks', () => {
            expect(ArrayUtils.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
        });
    });

    describe('shuffle', () => {
        test('should maintain array length after shuffle', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(ArrayUtils.shuffle(arr).length).toBe(arr.length);
        });
    });

    describe('uniqueAndSort', () => {
        test('should remove duplicates and sort array', () => {
            const arr = [
                { id: 2, name: 'John' },
                { id: 1, name: 'Jane' },
                { id: 2, name: 'John' }
            ];
            const result = ArrayUtils.uniqueAndSort(arr, 'id');
            expect(result.length).toBe(2);
            expect(result[0].id).toBe(1);
        });
    });

    describe('mostFrequent', () => {
        test('should find most frequent element', () => {
            const arr = [1, 2, 2, 3, 2, 4];
            const result = ArrayUtils.mostFrequent(arr);
            expect(result?.element).toBe('2');
            expect(result?.count).toBe(3);
        });
    });

    describe('paginate', () => {
        test('should paginate array correctly', () => {
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const result = ArrayUtils.paginate(arr, 2, 3);
            expect(result.data).toEqual([4, 5, 6]);
            expect(result.total).toBe(10);
            expect(result.currentPage).toBe(2);
            expect(result.totalPages).toBe(4);
        });
    });

    describe('isEqual', () => {
        test('should compare arrays correctly', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [3, 2, 1];
            const arr3 = [1, 2, 4];
            expect(ArrayUtils.isEqual(arr1, arr2)).toBe(true);
            expect(ArrayUtils.isEqual(arr1, arr3)).toBe(false);
        });
    });

    describe('countBy', () => {
        test('should count elements by key', () => {
            const arr = [
                { type: 'A', value: 1 },
                { type: 'B', value: 2 },
                { type: 'A', value: 3 }
            ];
            const result = ArrayUtils.countBy(arr, 'type');
            expect(result).toEqual({ A: 2, B: 1 });
        });
    });

    describe('sliding', () => {
        test('should create sliding windows', () => {
            const arr = [1, 2, 3, 4, 5];
            const result = ArrayUtils.sliding(arr, 2);
            expect(result).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]]);
        });
    });

    describe('zip', () => {
        test('should zip arrays together', () => {
            const arr1 = [1, 2, 3];
            const arr2 = ['a', 'b', 'c'];
            const result = ArrayUtils.zip(arr1, arr2);
            expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
        });
    });

    describe('union', () => {
        test('should create union of arrays', () => {
            const arr1 = [1, 2];
            const arr2 = [2, 3];
            const arr3 = [3, 4];
            const result = ArrayUtils.union(arr1, arr2, arr3);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });

    describe('swap', () => {
        test('should swap array elements', () => {
            const arr = [1, 2, 3, 4];
            const result = ArrayUtils.swap(arr, 0, 3);
            expect(result).toEqual([4, 2, 3, 1]);
        });
    });

    describe('toTree', () => {
        test('should convert array to tree structure', () => {
            const arr = [
                { id: 1, parentId: null, name: 'Root' },
                { id: 2, parentId: 1, name: 'Child 1' },
                { id: 3, parentId: 1, name: 'Child 2' }
            ];
            const result = ArrayUtils.toTree(arr);
            expect(result.length).toBe(1);
            expect(result[0].children.length).toBe(2);
        });
    });
});