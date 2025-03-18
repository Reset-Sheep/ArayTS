/**
 * 函数记忆化
 * @param fn 需要缓存的函数
 */
export const memoize = <T extends (...args: any[]) => any>(fn: T) => {
    const cache = new Map();
    
    return (...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

/**
 * LRU缓存
 */
export class LRUCache<K, V> {
    private cache = new Map<K, V>();
    
    constructor(private capacity: number) {}
    
    get(key: K): V | undefined {
        if (!this.cache.has(key)) return undefined;
        
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    put(key: K, value: V): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

/**
 * 洗牌算法
 */
export const shuffle = <T>(arr: T[]): T[] => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

/**
 * 最长公共子序列
 */
export const longestCommonSubsequence = (text1: string, text2: string): number => {
    const dp: number[][] = Array(text1.length + 1)
        .fill(0)
        .map(() => Array(text2.length + 1).fill(0));
    
    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[text1.length][text2.length];
};

/**
 * 最短编辑距离（Levenshtein Distance）
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
    const dp: number[][] = Array(str1.length + 1)
        .fill(0)
        .map(() => Array(str2.length + 1).fill(0));
    
    for (let i = 0; i <= str1.length; i++) dp[i][0] = i;
    for (let j = 0; j <= str2.length; j++) dp[0][j] = j;
    
    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,    // 删除
                    dp[i][j - 1] + 1,    // 插入
                    dp[i - 1][j - 1] + 1 // 替换
                );
            }
        }
    }
    
    return dp[str1.length][str2.length];
};

/**
 * 快速排序
 */
export const quickSort = <T>(arr: T[]): T[] => {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
};

/**
 * 二分查找
 * @returns 目标值的索引，未找到返回-1
 */
export const binarySearch = <T>(arr: T[], target: T): number => {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
};

/**
 * 并查集
 */
export class UnionFind {
    private parent: number[];
    private rank: number[];

    constructor(size: number) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }

    connected(x: number, y: number): boolean {
        return this.find(x) === this.find(y);
    }
}

/**
 * 二叉树节点
 */
export class TreeNode<T> {
    constructor(
        public value: T,
        public left: TreeNode<T> | null = null,
        public right: TreeNode<T> | null = null
    ) {}
}

/**
 * 二叉树遍历
 */
export const treeTraversal = {
    preorder<T>(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(root);
        return result;
    },

    inorder<T>(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        };
        traverse(root);
        return result;
    },

    postorder<T>(root: TreeNode<T> | null): T[] {
        const result: T[] = [];
        const traverse = (node: TreeNode<T> | null) => {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            result.push(node.value);
        };
        traverse(root);
        return result;
    }
};

/**
 * KMP字符串匹配
 * @returns 模式串在文本串中的起始位置，未找到返回-1
 */
export const kmp = (text: string, pattern: string): number => {
    if (pattern.length === 0) return 0;
    
    // 构建next数组
    const next: number[] = [0];
    for (let i = 1, j = 0; i < pattern.length; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = next[j - 1];
        }
        if (pattern[i] === pattern[j]) {
            j++;
        }
        next[i] = j;
    }
    
    // 匹配
    for (let i = 0, j = 0; i < text.length; i++) {
        while (j > 0 && text[i] !== pattern[j]) {
            j = next[j - 1];
        }
        if (text[i] === pattern[j]) {
            j++;
        }
        if (j === pattern.length) {
            return i - j + 1;
        }
    }
    
    return -1;
};

/**
 * Trie（前缀树）
 */
export class Trie {
    private root: {
        [key: string]: any;
        isEnd?: boolean;
    } = {};

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node[char]) {
                node[char] = {};
            }
            node = node[char];
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this.traverse(word);
        return node !== null && node.isEnd === true;
    }

    startsWith(prefix: string): boolean {
        return this.traverse(prefix) !== null;
    }

    private traverse(str: string): any {
        let node = this.root;
        for (const char of str) {
            if (!node[char]) {
                return null;
            }
            node = node[char];
        }
        return node;
    }
}

/**
 * 拓扑排序（Kahn算法）
 * @param graph 邻接表表示的有向图
 * @returns 拓扑排序结果，如果存在环则返回空数组
 */
export const topologicalSort = (graph: Map<number, number[]>): number[] => {
    const inDegree = new Map<number, number>();
    const result: number[] = [];
    const queue: number[] = [];

    // 初始化入度
    // 使用 Array.from() 遍历 Map
    Array.from(graph.entries()).forEach(([node, neighbors]) => {
        if (!inDegree.has(node)) {
            inDegree.set(node, 0);
        }
        neighbors.forEach(neighbor => {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        });
    });

    // 将入度为0的节点加入队列
    // 使用 Array.from() 将 Map 转换为数组进行遍历
    Array.from(inDegree.entries()).forEach(([node, degree]) => {
        if (degree === 0) {
            queue.push(node);
        }
    });

    // BFS
    while (queue.length > 0) {
        const node = queue.shift()!;
        result.push(node);

        if (graph.has(node)) {
            for (const neighbor of graph.get(node)!) {
                inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
                if (inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return result.length === inDegree.size ? result : [];
};