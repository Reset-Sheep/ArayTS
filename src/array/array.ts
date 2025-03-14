class ArrayUtils {
    /**
     * 数组去重
     */
    static unique<T>(arr: T[]): T[] {
        return Array.from(new Set(arr));
    }

    /**
     * 数组扁平化
     */
    static flatten<T>(arr: any[]): T[] {
        return arr.reduce((flat, toFlat) => {
            return flat.concat(Array.isArray(toFlat) ? ArrayUtils.flatten(toFlat) : toFlat);
        }, []);
    }

    /**
     * 数组分组
     */
    static groupBy<T>(arr: T[], key: keyof T): { [key: string]: T[] } {
        return arr.reduce((groups, item) => {
            const groupKey = String(item[key]);
            groups[groupKey] = groups[groupKey] || [];
            groups[groupKey].push(item);
            return groups;
        }, {} as { [key: string]: T[] });
    }

    /**
     * 数组排序（支持多字段）
     */
    static sortBy<T>(arr: T[], ...keys: (keyof T)[]): T[] {
        return [...arr].sort((a, b) => {
            for (const key of keys) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
            }
            return 0;
        });
    }

    /**
     * 数组交集
     */
    static intersection<T>(...arrays: T[][]): T[] {
        return arrays.reduce((a, b) => a.filter(c => b.includes(c)));
    }

    /**
     * 数组差集
     */
    static difference<T>(arr1: T[], arr2: T[]): T[] {
        return arr1.filter(x => !arr2.includes(x));
    }

    /**
     * 数组分块
     */
    static chunk<T>(arr: T[], size: number): T[][] {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
            arr.slice(i * size, i * size + size)
        );
    }

    /**
     * 移除数组中的假值
     */
    static compact<T>(arr: T[]): T[] {
        return arr.filter(Boolean);
    }

    /**
     * 获取数组中指定属性的值
     */
    static pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
        return arr.map(item => item[key]);
    }

    /**
     * 数组随机打乱
     */
    static shuffle<T>(arr: T[]): T[] {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * 数组去重并按照指定字段排序
     */
    static uniqueAndSort<T>(arr: T[], key?: keyof T): T[] {
        const uniqueArr = ArrayUtils.unique(arr);
        return key ? ArrayUtils.sortBy(uniqueArr, key) : uniqueArr;
    }

    /**
     * 查找数组中出现次数最多的元素
     */
    static mostFrequent<T>(arr: T[]): { element: T, count: number } | null {
        if (arr.length === 0) return null;
        const frequency = arr.reduce((acc, curr) => {
            acc[String(curr)] = (acc[String(curr)] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        const maxFreq = Math.max(...Object.values(frequency));
        const element = Object.keys(frequency).find(key => frequency[key] === maxFreq);
        return { element: element as unknown as T, count: maxFreq };
    }

    /**
     * 数组分页
     */
    static paginate<T>(arr: T[], page: number, pageSize: number): {
        data: T[],
        total: number,
        currentPage: number,
        totalPages: number
    } {
        const total = arr.length;
        const totalPages = Math.ceil(total / pageSize);
        const currentPage = Math.max(1, Math.min(page, totalPages));
        const start = (currentPage - 1) * pageSize;
        const data = arr.slice(start, start + pageSize);

        return {
            data,
            total,
            currentPage,
            totalPages
        };
    }

    /**
     * 数组深度比较
     */
    static isEqual<T>(arr1: T[], arr2: T[]): boolean {
        if (arr1.length !== arr2.length) return false;
        return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
    }

    /**
     * 数组元素统计
     */
    static countBy<T>(arr: T[], key: keyof T): { [key: string]: number } {
        return arr.reduce((acc, curr) => {
            const value = String(curr[key]);
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
    }

    /**
     * 数组窗口滑动
     */
    static sliding<T>(arr: T[], windowSize: number, step: number = 1): T[][] {
        const windows: T[][] = [];
        for (let i = 0; i <= arr.length - windowSize; i += step) {
            windows.push(arr.slice(i, i + windowSize));
        }
        return windows;
    }

    /**
     * 数组交叉合并
     */
    static zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
        const length = Math.min(arr1.length, arr2.length);
        return Array.from({ length }, (_, i) => [arr1[i], arr2[i]]);
    }

    /**
     * 数组求并集
     */
    static union<T>(...arrays: T[][]): T[] {
        return ArrayUtils.unique(arrays.flat());
    }

    /**
     * 数组元素位置交换
     */
    static swap<T>(arr: T[], index1: number, index2: number): T[] {
        const result = [...arr];
        [result[index1], result[index2]] = [result[index2], result[index1]];
        return result;
    }

    /**
     * 数组转树形结构
     */
    static toTree<T extends { id: number | string, parentId: number | string | null }>(
        arr: T[],
        parentId: number | string | null = null
    ): (T & { children: T[] })[] {
        return arr
            .filter(item => item.parentId === parentId)
            .map(item => ({
                ...item,
                children: ArrayUtils.toTree(arr, item.id)
            }));
    }
}

export default ArrayUtils;