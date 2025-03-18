import { ObjectUtils } from '../utils/object';

describe('ObjectUtils', () => {
    describe('deepClone', () => {
        it('should deep clone primitive values', () => {
            expect(ObjectUtils.deepClone(123)).toBe(123);
            expect(ObjectUtils.deepClone('test')).toBe('test');
            expect(ObjectUtils.deepClone(null)).toBeNull();
        });

        it('should deep clone objects', () => {
            const obj = { a: 1, b: { c: 2 } };
            const cloned = ObjectUtils.deepClone(obj);
            expect(cloned).toEqual(obj);
            expect(cloned).not.toBe(obj);
            expect(cloned.b).not.toBe(obj.b);
        });

        it('should deep clone arrays', () => {
            const arr = [1, [2, 3], { a: 4 }];
            const cloned = ObjectUtils.deepClone(arr);
            expect(cloned).toEqual(arr);
            expect(cloned).not.toBe(arr);
            expect(cloned[1]).not.toBe(arr[1]);
        });

        it('should deep clone dates', () => {
            const date = new Date();
            const cloned = ObjectUtils.deepClone(date);
            expect(cloned).toEqual(date);
            expect(cloned).not.toBe(date);
        });
    });

    describe('merge', () => {
        it('should merge objects', () => {
            const target = { a: 1, b: 2 };
            const source1 = { b: 3, c: 4 };
            const source2 = { d: 5 };
            const result = ObjectUtils.merge<{ a: number, b: number }>(target, source1, source2 as Partial<{ a: number, b: number }>);
            expect(result).toEqual({ a: 1, b: 3, c: 4, d: 5 });
        });
    });

    describe('get', () => {
        it('should get nested object value', () => {
            const obj = { a: { b: { c: 1 } } };
            expect(ObjectUtils.get(obj, 'a.b.c')).toBe(1);
            expect(ObjectUtils.get(obj, 'a.b.d', 'default')).toBe('default');
        });
    });

    describe('isEmpty', () => {
        it('should check if object is empty', () => {
            expect(ObjectUtils.isEmpty({})).toBe(true);
            expect(ObjectUtils.isEmpty({ a: 1 })).toBe(false);
        });
    });

    describe('omit', () => {
        const obj = { name: 'John', age: 30, email: 'john@example.com' };

        it('should exclude specified properties', () => {
            const result = ObjectUtils.omit(obj, ['age', 'email']);
            expect(result).toEqual({ name: 'John' });
        });

        it('should keep only specified properties', () => {
            const result = ObjectUtils.omit(obj, ['name', 'age'], false);
            expect(result).toEqual({ name: 'John', age: 30 });
        });

        it('should handle empty props array', () => {
            const result = ObjectUtils.omit(obj, []);
            expect(result).toEqual(obj);
        });
    });
});