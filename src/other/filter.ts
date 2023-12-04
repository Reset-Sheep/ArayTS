const fuzzyFilter = (userInput: string, data: Array<any>, fieldName: string, maxResults: number = 3) => {
    // 将输入字符串拆分成多个子串
    const inputSegments = userInput.split(/\s+/);

    // 计算每个数据项的匹配度
    const itemsWithMatchCounts = data.map((item) => {
        // 确保字段存在且不为 undefined 或 null
        const fieldValue = item[fieldName];
        if (fieldValue === undefined || fieldValue === null) {
            return { item, totalMatchCount: 0 };
        }

        // 计算总匹配度
        const totalMatchCount = inputSegments.reduce((count, segment) => {
            const escapedSegment = segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(escapedSegment, 'iu');
            const segmentMatchCount = (fieldValue.match(regex) || []).length;
            return count + segmentMatchCount;
        }, 0);

        return { item, totalMatchCount };
    });

    // 根据匹配度排序
    itemsWithMatchCounts.sort((a, b) => b.totalMatchCount - a.totalMatchCount);

    // 获取前 maxResults 个匹配项
    const topMatchedItems = itemsWithMatchCounts.slice(0, maxResults).map(({ item }) => item);

    return topMatchedItems;
};

export { fuzzyFilter };
