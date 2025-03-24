import { base64ToFile } from '../utils/fileUtils';

// describe('fileUtils', () => {
//     describe('base64ToFile', () => {
//         beforeEach(() => {
//             // 模拟 document.createElement
//             document.createElement = jest.fn().mockReturnValue({
//                 href: '',
//                 download: '',
//                 click: jest.fn()
//             });

//             // 模拟 URL.createObjectURL 和 revokeObjectURL
//             URL.createObjectURL = jest.fn().mockReturnValue('blob:test');
//             URL.revokeObjectURL = jest.fn();
//         });

//         it('应该成功导出文件', async () => {
//             // 简单的 base64 字符串（"Hello World"的base64编码）
//             const base64Data = 'SGVsbG8gV29ybGQ=';
//             const fileName = 'test.txt';
//             const mimeType = 'text/plain';

//             const result = await base64ToFile(base64Data, fileName, mimeType);

//             expect(result).toBe(true);
//             expect(document.createElement).toHaveBeenCalledWith('a');
//             expect(URL.createObjectURL).toHaveBeenCalled();
//             expect(URL.revokeObjectURL).toHaveBeenCalled();
//         });

//         it('应该处理带有 data URI 前缀的 base64 数据', async () => {
//             const base64Data = 'data:text/plain;base64,SGVsbG8gV29ybGQ=';
//             const fileName = 'test.txt';

//             const result = await base64ToFile(base64Data, fileName);

//             expect(result).toBe(true);
//         });

//         it('应该在发生错误时返回 false', async () => {
//             // 使用无效的 base64 数据
//             const base64Data = 'invalid-base64-data';
//             const fileName = 'test.txt';

//             const result = await base64ToFile(base64Data, fileName);

//             expect(result).toBe(false);
//         });
//     });
// });