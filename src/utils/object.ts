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
}