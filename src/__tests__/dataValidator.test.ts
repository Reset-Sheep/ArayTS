import { DataValidator, DataConverter,ValidationRule } from '../dataValidator/dataValidator';

describe('DataValidator', () => {
  let validator: DataValidator;

  beforeEach(() => {
    const rules: Record<string, ValidationRule> = {
      name: { type: 'string', required: true },
      age: { type: 'number', required: true, transform: (value: any) => Math.floor(Number(value)) },
      isActive: { type: 'boolean', required: false },
      birthDate: { type: 'date', required: true },
      hobbies: { type: 'array', required: false },
      profile: { type: 'object', required: false }
    };
    validator = new DataValidator(rules);
  });

  test('应该通过有效数据的验证', () => {
    const validData = {
      name: 'John Doe',
      age: 21,
      isActive: true,
      birthDate: new Date('1998-01-01'),
      hobbies: ['reading', 'gaming'],
      profile: { country: 'China' }
    };

    const result = validator.validate(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(validData.age).toBe(21); // 验证 transform 函数是否正确执行
  });

  test('应该检测到缺失的必填字段', () => {
    const invalidData = {
      name: 'John Doe',
      // age 缺失
      birthDate: '1998-01-01'
    };

    const result = validator.validate(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('age is required.');
  });

  test('应该检测到错误的数据类型', () => {
    const invalidData = {
      name: 'John Doe',
      age: 'not a number',
      birthDate: 'invalid date'
    };

    const result = validator.validate(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('age should be of type number.');  // 添加句点
  });
});

describe('DataConverter', () => {
  test('应该正确转换各种数据类型', () => {
    // 测试字符串转换
    expect(DataConverter.convert(123, 'string')).toBe('123');

    // 测试数字转换
    expect(DataConverter.convert('456', 'number')).toBe(456);

    // 测试布尔值转换
    expect(DataConverter.convert(1, 'boolean')).toBe(true);
    expect(DataConverter.convert(0, 'boolean')).toBe(false);

    // 测试日期转换
    const dateStr = '2023-01-01';
    const convertedDate = DataConverter.convert(dateStr, 'date');
    expect(convertedDate instanceof Date).toBe(true);
    expect(convertedDate.toISOString().startsWith('2023-01-01')).toBe(true);

    // 测试数组转换
    expect(DataConverter.convert('single item', 'array')).toEqual(['single item']);
    expect(DataConverter.convert(['multiple', 'items'], 'array')).toEqual(['multiple', 'items']);
  });

  test('应该在不支持的类型转换时抛出错误', () => {
    expect(() => {
      DataConverter.convert({}, 'object');
    }).toThrow('Unsupported target type: object');
  });
});