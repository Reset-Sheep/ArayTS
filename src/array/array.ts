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
     static uniqueAndSort<T extends Record<string, any>>(arr: T[], key: keyof T): T[] {
        // 使用 Map 来存储唯一项
        const uniqueMap = new Map<any, T>();
        
        // 遍历数组，将每个项按照指定的 key 存储
        for (const item of arr) {
            const keyValue = item[key];
            if (!uniqueMap.has(keyValue)) {
                uniqueMap.set(keyValue, item);
            }
        }
        
        // 转换为数组并排序
        return Array.from(uniqueMap.values()).sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
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

    

    /**
     * 带权重的随机选择
     * @param arr 源数组
     * @param weights 权重数组
     * @returns 根据权重随机选择的元素
     */
    static weightedRandom<T>(arr: T[], weights: number[]): T {
        if (arr.length !== weights.length) {
            throw new Error('数组长度与权重数组长度不匹配');
        }

        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < arr.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return arr[i];
            }
        }
        
        return arr[arr.length - 1];
    }

    /**
     * 查找最长连续序列
     * @param arr 数字数组
     * @returns 最长连续序列的长度
     */
    static longestConsecutive(arr: number[]): number {
        if (arr.length === 0) return 0;
        
        const numSet = new Set(arr);
        let longest = 0;

        Array.from(numSet).forEach(num => {
            if (!numSet.has(num - 1)) {
                let currentNum = num;
                let currentStreak = 1;

                while (numSet.has(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }

                longest = Math.max(longest, currentStreak);
            }
        });

        return longest;
    }

    /**
     * 获取滑动窗口最大值
     * @param arr 数字数组
     * @param k 窗口大小
     * @returns 每个窗口的最大值数组
     */
    static maxSlidingWindow(arr: number[], k: number): number[] {
        const result: number[] = [];
        const deque: number[] = [];

        for (let i = 0; i < arr.length; i++) {
            // 移除超出窗口范围的索引
            while (deque.length > 0 && deque[0] <= i - k) {
                deque.shift();
            }

            // 移除所有小于当前元素的值
            while (deque.length > 0 && arr[deque[deque.length - 1]] < arr[i]) {
                deque.pop();
            }

            deque.push(i);

            // 当窗口完全形成后，记录最大值
            if (i >= k - 1) {
                result.push(arr[deque[0]]);
            }
        }

        return result;
    }

    /**
     * 带条件的分组聚合
     * @param arr 源数组
     * @param groupKey 分组键
     * @param aggregates 聚合函数配置
     */
    static groupByWithAggregates<T extends Record<string, any>>(
        arr: T[],
        groupKey: keyof T,
        aggregates: {
            [key: string]: {
                field: keyof T,
                operation: 'sum' | 'avg' | 'max' | 'min' | 'count'
            }
        }
    ): Record<string, Record<string, number>> {
        const groups = ArrayUtils.groupBy(arr, groupKey);
        const result: Record<string, Record<string, number>> = {};

        for (const [key, group] of Object.entries(groups)) {
            result[key] = {};
            for (const [aggKey, { field, operation }] of Object.entries(aggregates)) {
                switch (operation) {
                    case 'sum':
                        result[key][aggKey] = group.reduce((sum, item) => sum + Number(item[field]), 0);
                        break;
                    case 'avg':
                        result[key][aggKey] = group.reduce((sum, item) => sum + Number(item[field]), 0) / group.length;
                        break;
                    case 'max':
                        result[key][aggKey] = Math.max(...group.map(item => Number(item[field])));
                        break;
                    case 'min':
                        result[key][aggKey] = Math.min(...group.map(item => Number(item[field])));
                        break;
                    case 'count':
                        result[key][aggKey] = group.length;
                        break;
                }
            }
        }

        return result;
    }

    /**
     * 计算多个数组的笛卡尔积
     * @param arrays 多个数组
     * @returns 笛卡尔积结果
     */
    static cartesianProduct<T>(...arrays: T[][]): T[][] {
        if (arrays.length === 0) return [[]];
        return arrays.reduce((acc: T[][], curr: T[]) => {
            return acc.flatMap((x: T[]) => curr.map((y: T) => [...x, y]));
        }, [[]]);
    }

    /**
     * 数组环形旋转
     */
    static rotate<T>(arr: T[], k: number): T[] {
        const len = arr.length;
        k = k % len;
        const result = [...arr];
        const temp = result.splice(-k);
        return [...temp, ...result];
    }

    /**
     * 计算数组中位数
     */
    static median(arr: number[]): number {
        const sorted = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];
    }

    /**
     * 动态过滤数组
     */
    static filterDynamic<T>(
        arr: T[],
        conditions: Array<{
            field: keyof T,
            operator: '==' | '!=' | '>' | '<' | '>=' | '<=',
            value: any
        }>
    ): T[] {
        return arr.filter(item => {
            return conditions.every(condition => {
                const value = item[condition.field];
                switch (condition.operator) {
                    case '==': return value === condition.value;
                    case '!=': return value !== condition.value;
                    case '>': return value > condition.value;
                    case '<': return value < condition.value;
                    case '>=': return value >= condition.value;
                    case '<=': return value <= condition.value;
                    default: return true;
                }
            });
        });
    }

    /**
     * 数组移动元素
     */
    static move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
        const result = [...arr];
        const element = result.splice(fromIndex, 1)[0];
        result.splice(toIndex, 0, element);
        return result;
    }

    /**
     * 查找数组中的峰值元素索引
     */
    static findPeakElement(arr: number[]): number {
        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] > arr[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }

    /**
     * 数组的运行时累加
     */
    static runningSum(arr: number[]): number[] {
        const result = [...arr];
        for (let i = 1; i < result.length; i++) {
            result[i] += result[i - 1];
        }
        return result;
    }

    /**
     * 查找最接近目标值的元素
     */
    static findClosest<T extends number>(arr: T[], target: number): T {
        return arr.reduce((prev, curr) => 
            Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
        );
    }
}

export default ArrayUtils;