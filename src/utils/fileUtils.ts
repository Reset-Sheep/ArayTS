export const base64ToFile = async (base64Data: string, fileName: string, mimeType: string = ''): Promise<boolean> => {
    try {
        // 移除 base64 数据的前缀（如果有）
        const base64Content = base64Data.replace(/^data:.*?;base64,/, '');
        
        // 转换 base64 为 Uint8Array
        const byteCharacters = atob(base64Content);
        const byteArray = new Uint8Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }

        // 创建 Blob 对象
        const blob = new Blob([byteArray], { type: mimeType });
        
        // 创建下载链接并触发下载
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        
        // 清理
        URL.revokeObjectURL(link.href);
        return true;
    } catch (error) {
        console.error('导出文件失败:', error);
        return false;
    }
};