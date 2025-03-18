/**
 * 异步工具函数集合
 */
export class Async {
    /**
     * 重试函数：当异步操作失败时自动重试
     * @param fn 需要重试的异步函数
     * @param maxAttempts 最大重试次数
     * @param delay 重试间隔(ms)
     */
    static async retry<T>(
        fn: () => Promise<T>,
        maxAttempts: number = 3,
        delay: number = 1000
    ): Promise<T> {
        let lastError: Error;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error as Error;
                if (attempt === maxAttempts) break;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        throw new Error(`重试${maxAttempts}次后失败: ${lastError.message}`);
    }

    /**
     * 超时控制：为异步操作添加超时限制
     * @param promise 原始Promise
     * @param timeout 超时时间(ms)
     */
    static async withTimeout<T>(
        promise: Promise<T>,
        timeout: number
    ): Promise<T> {
        const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => reject(new Error('操作超时')), timeout);
        });

        return Promise.race([promise, timeoutPromise]);
    }

    /**
     * 并发控制：限制并发请求数量
     * @param tasks 任务数组
     * @param limit 并发限制数
     */
    static async parallel<T>(
        tasks: (() => Promise<T>)[],
        limit: number = 3
    ): Promise<T[]> {
        const results: T[] = [];
        const executing: Promise<void>[] = [];

        // 使用传统的 for 循环替代 for...of 迭代
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const p = task().then(result => {
                results[i] = result;
            });

            executing.push(p);

            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }

        await Promise.all(executing);
        return results;
    }

    /**
     * 防抖函数：将多次调用合并为一次
     * @param fn 需要防抖的函数
     * @param wait 等待时间(ms)
     */
    static debounce<T extends (...args: any[]) => Promise<any>>(
        fn: T,
        wait: number = 300
    ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
        let timeout: NodeJS.Timeout;
        let pendingPromise: Promise<any> | null = null;

        return (...args: Parameters<T>) => {
            if (!pendingPromise) {
                pendingPromise = new Promise((resolve, reject) => {
                    const execute = () => {
                        fn(...args)
                            .then(resolve)
                            .catch(reject)
                            .finally(() => {
                                pendingPromise = null;
                            });
                    };

                    clearTimeout(timeout);
                    timeout = setTimeout(execute, wait);
                });
            }

            return pendingPromise;
        };
    }

    /**
     * 节流函数：限制函数调用频率
     * @param fn 需要节流的函数
     * @param wait 等待时间(ms)
     */
    static throttle<T extends (...args: any[]) => Promise<any>>(
        fn: T,
        wait: number = 300
    ): (...args: Parameters<T>) => Promise<ReturnType<T>> {
        let lastCall = 0;
        let lastPromise: Promise<any> | null = null;

        return (...args: Parameters<T>) => {
            const now = Date.now();
            
            if (!lastPromise || now - lastCall >= wait) {
                lastCall = now;
                lastPromise = fn(...args);
                return lastPromise;
            }
            
            return lastPromise;
        };
    }

    /**
     * 缓存异步结果
     * @param fn 异步函数
     * @param ttl 缓存有效期(ms)
     */
    static memoize<T extends (...args: any[]) => Promise<any>>(
        fn: T,
        ttl: number = 5000
    ): T {
        const cache = new Map<string, { value: any; timestamp: number }>();

        return ((...args: Parameters<T>) => {
            const key = JSON.stringify(args);
            const cached = cache.get(key);
            const now = Date.now();

            if (cached && now - cached.timestamp < ttl) {
                return Promise.resolve(cached.value);
            }

            return fn(...args).then(value => {
                cache.set(key, { value, timestamp: now });
                return value;
            });
        }) as T;
    }

    /**
     * 等待任务完成
     * @param condition 条件判断函数
     * @param options 配置选项
     * @returns Promise<boolean>
     */
    static async waitUntil(
        condition: () => Promise<boolean> | boolean,
        options: {
            timeout?: number;      // 超时时间(ms)
            interval?: number;     // 检查间隔(ms)
            timeoutMessage?: string; // 超时提示信息
        } = {}
    ): Promise<boolean> {
        const {
            timeout = 30000,
            interval = 1000,
            timeoutMessage = '等待超时'
        } = options;

        const startTime = Date.now();

        while (true) {
            const result = await Promise.resolve(condition());
            if (result) return true;

            if (Date.now() - startTime >= timeout) {
                throw new Error(timeoutMessage);
            }

            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
}