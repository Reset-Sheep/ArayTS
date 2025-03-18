/**
 * A*寻路算法
 */
export class AStar {
    private static manhattan(x1: number, y1: number, x2: number, y2: number): number {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    static findPath(
        grid: boolean[][],
        start: [number, number],
        end: [number, number]
    ): [number, number][] {
        const rows = grid.length;
        const cols = grid[0].length;
        const openSet = new Set<string>();
        const closedSet = new Set<string>();
        const cameFrom = new Map<string, string>();
        const gScore = new Map<string, number>();
        const fScore = new Map<string, number>();
        
        const startKey = `${start[0]},${start[1]}`;
        openSet.add(startKey);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.manhattan(start[0], start[1], end[0], end[1]));

        while (openSet.size > 0) {
            let current = '';
            let minF = Infinity;
            
            // 使用Array.from()将Set转换为数组以进行迭代
            Array.from(openSet).forEach(pos => {
                const f = fScore.get(pos) || Infinity;
                if (f < minF) {
                    minF = f;
                    current = pos;
                }
            });

            if (current === `${end[0]},${end[1]}`) {
                const path: [number, number][] = [];
                let curr = current;
                while (curr) {
                    const [x, y] = curr.split(',').map(Number);
                    path.unshift([x, y]);
                    curr = cameFrom.get(curr) || '';
                }
                return path;
            }

            openSet.delete(current);
            closedSet.add(current);
            const [x, y] = current.split(',').map(Number);

            const neighbors: [number, number][] = [
                [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]
            ];

            for (const [nx, ny] of neighbors) {
                if (nx < 0 || nx >= rows || ny < 0 || ny >= cols || 
                    grid[nx][ny] || closedSet.has(`${nx},${ny}`)) {
                    continue;
                }

                const tentativeG = (gScore.get(current) || 0) + 1;
                const neighborKey = `${nx},${ny}`;

                if (!openSet.has(neighborKey)) {
                    openSet.add(neighborKey);
                } else if (tentativeG >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }

                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeG);
                fScore.set(neighborKey, tentativeG + this.manhattan(nx, ny, end[0], end[1]));
            }
        }

        return [];
    }
}