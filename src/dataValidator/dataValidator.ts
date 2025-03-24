type DataType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';

export interface ValidationRule {
  type: DataType;
  required?: boolean;
  defaultValue?: any;
  transform?: (value: any) => any; // 自定义转换函数
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class DataValidator {
  private rules: Record<string, ValidationRule>;

  constructor(rules: Record<string, ValidationRule>) {
    this.rules = rules;
  }

  // 数据验证方法
  validate(data: Record<string, any>): ValidationResult {
    const errors: string[] = [];
    
    for (const key in this.rules) {
      const rule = this.rules[key];
      const value = data[key];

      // 检查是否存在值
      if (rule.required && (value === undefined || value === null)) {
        errors.push(`${key} is required.`);
        continue;
      }

      // 类型验证
      if (value !== undefined && !this.isValidType(value, rule.type)) {
        errors.push(`${key} should be of type ${rule.type}.`);
        continue;
      }

      // 转换数据
      if (value !== undefined && rule.transform) {
        try {
          data[key] = rule.transform(value);
        } catch (error) {
          errors.push(`Error in transforming ${key}: ${error.message}`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // 检查数据类型
  private isValidType(value: any, type: DataType): boolean {
    switch (type) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number';
      case 'boolean':
        return typeof value === 'boolean';
      case 'date':
        return value instanceof Date && !isNaN(value.getTime());
      case 'array':
        return Array.isArray(value);
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      default:
        return false;
    }
  }
}

export class DataConverter {
  // 数据转换方法：字符串 -> 数字，数字 -> 字符串等
  static convert(value: any, targetType: DataType): any {
    switch (targetType) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      case 'date':
        return new Date(value);
      case 'array':
        return Array.isArray(value) ? value : [value];
      default:
        throw new Error(`Unsupported target type: ${targetType}`);
    }
  }

  // 异常处理方法
  static handleError(error: Error, context: string) {
    console.error(`[DataConverter Error] Context: ${context} - ${error.message}`);
  }
}

// 示例：使用 DataValidator 进行数据验证和转换

// const validationRules = {
//   userId: { type: 'string', required: true },
//   age: { type: 'number', required: true, transform: (value: any) => Math.floor(Number(value)) }, // 转换为整数
//   email: { type: 'string', required: false },
//   createdAt: { type: 'date', required: true },
// };

// const dataValidator = new DataValidator(validationRules);

// const inputData = {
//   userId: '123',
//   age: '29.9', // 这是一个字符串，需要转换成数字
//   email: 'example@example.com',
//   createdAt: '2023-03-25T12:00:00Z', // 字符串，需要转换成日期
// };

// const result = dataValidator.validate(inputData);
// if (!result.isValid) {
//   console.log('Validation failed:', result.errors);
// } else {
//   console.log('Validation passed:', inputData);
// }

// // 使用 DataConverter 进行类型转换
// try {
//   const convertedDate = DataConverter.convert('2023-03-25', 'date');
//   console.log('Converted Date:', convertedDate);
// } catch (error) {
//   DataConverter.handleError(error, 'Date conversion');
// }
