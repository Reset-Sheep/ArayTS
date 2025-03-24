import {
    UnwrapPromise,
    Optional,
    Required,
    Readonly,
    ReturnTypeOf,
    ArrayElement,
    Merge,
    UnionToIntersection,
    NonNullableProperties,
    MethodsOf,
    UnionToTuple,
    DeepUnwrapPromise,
    TypedEventEmitter
} from '../utils/typeUtils';

describe('Type Utils Tests', () => {
    // UnwrapPromise
    test('UnwrapPromise should extract the type from Promise', () => {
        type StringPromise = Promise<string>;
        type UnwrappedType = UnwrapPromise<StringPromise>;
        const value: UnwrappedType = 'test';
        expect(typeof value).toBe('string');
    });

    // Optional
    test('Optional should make all properties optional', () => {
        interface Person {
            name: string;
            age: number;
        }
        const person: Optional<Person> = {};
        expect(person).toEqual({});
    });

    // Required
    test('Required should make all properties required', () => {
        interface PartialPerson {
            name?: string;
            age?: number;
        }
        const person: Required<PartialPerson> = {
            name: 'John',
            age: 30
        };
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('age');
    });

    // ArrayElement
    test('ArrayElement should extract array element type', () => {
        const numbers = [1, 2, 3] as const;
        type NumberType = ArrayElement<typeof numbers>;
        const num: NumberType = 1;
        expect(typeof num).toBe('number');
    });

    // Merge
    test('Merge should combine two object types', () => {
        interface A { a: string }
        interface B { b: number }
        const merged: Merge<A, B> = { a: 'test', b: 123 };
        expect(merged).toEqual({ a: 'test', b: 123 });
    });

    // NonNullableProperties
    test('NonNullableProperties should remove null and undefined', () => {
        interface NullableProps {
            name: string | null;
            age: number | undefined;
        }
        const props: NonNullableProperties<NullableProps> = {
            name: 'John',
            age: 30
        };
        expect(props.name).not.toBeNull();
        expect(props.age).not.toBeUndefined();
    });

    // TypedEventEmitter
    test('TypedEventEmitter should handle typed events', () => {
        interface Events {
            click: { x: number; y: number };
            load: string;
        }

        const emitter: TypedEventEmitter<Events> = {
            on: jest.fn(),
            emit: jest.fn()
        };

        const clickHandler = (data: { x: number; y: number }) => {};
        emitter.on('click', clickHandler);
        emitter.emit('click', { x: 10, y: 20 });

        expect(emitter.on).toHaveBeenCalledWith('click', clickHandler);
        expect(emitter.emit).toHaveBeenCalledWith('click', { x: 10, y: 20 });
    });

    // DeepUnwrapPromise
    test('DeepUnwrapPromise should unwrap nested promises', () => {
        type NestedPromise = Promise<Promise<Promise<string>>>;
        type Unwrapped = DeepUnwrapPromise<NestedPromise>;
        const value: Unwrapped = 'test';
        expect(typeof value).toBe('string');
    });

    // UnionToTuple
    test('UnionToTuple should convert union to tuple', () => {
        type Union = 'a' | 'b' | 'c';
        type Tuple = UnionToTuple<Union>;
        const tuple: Tuple = ['a', 'b', 'c'];
        expect(Array.isArray(tuple)).toBe(true);
        expect(tuple).toHaveLength(3);
    });
});