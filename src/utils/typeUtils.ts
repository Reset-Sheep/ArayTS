/**
 * 类型工具集合
 */

// 提取Promise返回值类型
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// 将类型转换为可选类型
export type Optional<T> = {
    [P in keyof T]?: T[P];
};

// 将类型中的所有属性转换为必选
export type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 将类型转换为只读类型
export type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 提取函数返回值类型
export type ReturnTypeOf<T extends (...args: any) => any> = ReturnType<T>;

// 提取数组元素类型
export type ArrayElement<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;

// 合并多个类型
export type Merge<T extends object, U extends object> = Omit<T, keyof U> & U;

// 将联合类型转换为交叉类型
export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// 提取对象中的非空值类型
export type NonNullableProperties<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

// 提取对象类型中的指定键值对
export type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 排除对象类型中的指定键值对
export type Exclude<T, U> = T extends U ? never : T;

// 获取函数参数类型
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 提取对象中的方法类型
export type MethodsOf<T> = {
    [P in keyof T]: T[P] extends Function ? P : never
}[keyof T];

// 提取类型中的所有键名
export type KeysOf<T> = keyof T;

// 提取类型中的所有值类型
export type ValuesOf<T> = T[keyof T];

// 创建一个具有指定键和值类型的对象类型
export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 将联合类型转换为元组类型
export type UnionToTuple<T> = 
    UnionToIntersection<T extends any ? () => T : never> extends () => infer R
        ? [...UnionToTuple<Exclude<T, R>>, R]
        : [];

// 提取类中的公共属性
export type PublicProperties<T> = Pick<T, keyof T>;

// 移除类型中的 undefined 和 null
export type NonNullable<T> = T extends null | undefined ? never : T;

// 创建一个字符串字面量类型
export type StringLiteral<T extends string> = T;

// 提取Promise链中的最终返回值类型
export type DeepUnwrapPromise<T> = T extends Promise<infer U> 
    ? DeepUnwrapPromise<U>
    : T;

    // 创建一个只允许特定值的类型
export type Literal<T extends string | number | boolean> = T;

// 创建一个类型安全的事件发射器类型
export type TypedEventEmitter<T> = {
    on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
    emit<K extends keyof T>(event: K, data: T[K]): void;
};