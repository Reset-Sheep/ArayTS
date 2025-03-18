/**
 * 布隆过滤器
 */
export class BloomFilter {
    private bitArray: boolean[];
    private hashFunctions: ((item: string) => number)[];

    constructor(size: number, numHashes: number) {
        this.bitArray = new Array(size).fill(false);
        this.hashFunctions = Array(numHashes).fill(0).map((_, i) => {
            return (item: string) => {
                let hash = 0;
                for (let j = 0; j < item.length; j++) {
                    hash = ((hash << 5) - hash + item.charCodeAt(j)) >>> 0;
                    hash = ((hash + i) * 16777619) >>> 0;
                }
                return hash % size;
            };
        });
    }

    add(item: string): void {
        for (const hashFunc of this.hashFunctions) {
            this.bitArray[hashFunc(item)] = true;
        }
    }

    test(item: string): boolean {
        return this.hashFunctions.every(hashFunc => this.bitArray[hashFunc(item)]);
    }
}