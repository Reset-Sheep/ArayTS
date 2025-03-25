export class ObjectUtils {
    /**
     * 深拷贝对象
     */
    static deepClone<T>(obj: T): T {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        if (obj instanceof Date) {
            return new Date(obj.getTime()) as any;
        }

        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item)) as any;
        }

        if (obj instanceof Object) {
            const copy = {} as T;
            Object.keys(obj).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    (copy as any)[key] = this.deepClone((obj as any)[key]);
                }
            });
            return copy;
        }

        return obj;
    }

    /**
     * 合并对象
     */
    static merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
        return Object.assign(target, ...sources);
    }

    /**
     * 获取对象指定路径的值
     */
    static get<T>(obj: T, path: string, defaultValue?: any): any {
        const keys = path.split('.');
        let result: any = obj;

        for (const key of keys) {
            if (result === undefined || result === null) {
                return defaultValue;
            }
            result = result[key as keyof typeof result];
        }

        return result === undefined ? defaultValue : result;
    }

    /**
     * 判断对象是否为空
     */
    static isEmpty(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    /**
     * 剔除对象中的指定属性
     * @param obj 源对象
     * @param props 要剔除的属性数组
     * @param exclude 为true时剔除指定属性，为false时只保留指定属性
     */
    static omit<T extends object, K extends keyof T>(
        obj: T,
        props: K[],
        exclude: boolean = true
    ): Partial<T> {
        const result: Partial<T> = {};
        
        Object.keys(obj).forEach((key) => {
            const k = key as K;
            if (exclude ? !props.includes(k) : props.includes(k)) {
                result[k] = obj[k];
            }
        });
        
        return result;
    }

    /**
     * 比较两个对象是否相等
     */
    static isEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true;
        
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || 
            obj1 === null || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every(key => 
            Object.prototype.hasOwnProperty.call(obj2, key) && 
            this.isEqual(obj1[key], obj2[key])
        );
    }

    /**
     * 将对象扁平化，支持自定义分隔符
     */
    static flatten(obj: object, delimiter: string = '.', prefix: string = ''): Record<string, any> {
        return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
            const pre = prefix.length ? prefix + delimiter : '';
            if (typeof obj[key as keyof typeof obj] === 'object' && obj[key as keyof typeof obj] !== null) {
                Object.assign(acc, this.flatten(obj[key as keyof typeof obj], delimiter, pre + key));
            } else {
                acc[pre + key] = obj[key as keyof typeof obj];
            }
            return acc;
        }, {});
    }

    /**
     * 将对象转换为查询字符串
     */
    static toQueryString(obj: Record<string, any>): string {
        return Object.entries(obj)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value
                        .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
                        .join('&');
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join('&');
    }

    /**
     * 重命名对象的属性
     */
    static renameKeys<T extends object>(
        obj: T,
        keysMap: Record<string, string>
    ): Record<string, any> {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = keysMap[key] || key;
            acc[newKey] = obj[key as keyof T];
            return acc;
        }, {} as Record<string, any>);
    }

    /**
     * 根据条件过滤对象的属性
     */
    static filterProperties<T extends object>(
        obj: T,
        predicate: (value: any, key: string) => boolean
    ): Partial<T> {
        return Object.keys(obj).reduce((acc, key) => {
            if (predicate(obj[key as keyof T], key)) {
                acc[key as keyof T] = obj[key as keyof T];
            }
            return acc;
        }, {} as Partial<T>);
    }


    /**
     * 对象深度合并
     */
    static deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
        if (!sources.length) return target;
        const source = sources.shift();
        
        if (source === undefined) return target;
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key as keyof typeof source])) {
                    if (!target[key as keyof T]) {
                        Object.assign(target, { [key]: {} });
                    }
                    this.deepMerge(target[key as keyof T] as object, source[key as keyof typeof source] as object);
                } else {
                    Object.assign(target, { [key]: source[key as keyof typeof source] });
                }
            });
        }
        
        return this.deepMerge(target, ...sources);
    }

    /**
     * 判断是否为对象
     */
    private static isObject(item: any): boolean {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * 将对象转换为数组
     */
    static toArray<T extends object>(obj: T): [keyof T, T[keyof T]][] {
        return Object.entries(obj) as [keyof T, T[keyof T]][];
    }

    /**
     * 从数组创建对象
     */
    static fromArray<T = any>(arr: [string, T][]): Record<string, T> {
        return Object.fromEntries(arr);
    }

    /**
     * 对象属性排序
     */
    static sort<T extends object>(
        obj: T,
        compareFn?: (a: [string, any], b: [string, any]) => number
    ): T {
        const defaultCompare = (a: [string, any], b: [string, any]) => a[0].localeCompare(b[0]);
        const sortedEntries = Object.entries(obj).sort(compareFn || defaultCompare);
        return Object.fromEntries(sortedEntries) as T;
    }
}