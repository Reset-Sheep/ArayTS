class TypeInfer {
    /**
     * 从数据结构推导类型定义
     */
    static generateType(data: any, typeName: string = 'Generated'): string {
        const type = this.inferType(data);
        return this.formatType(type, typeName);
    }

    /**
     * 从数据结构生成 TypeScript 接口定义
     */
    static generateInterface(data: any, interfaceName: string = 'IGenerated'): string {
        const type = this.inferType(data);
        return this.formatInterface(type, interfaceName);
    }

    /**
     * 生成类型声明文件
     */
    static generateTypeDefinition(data: any, name: string = 'Generated'): string {
        const interfaceContent = this.generateInterface(data, `I${name}`);
        const typeContent = this.generateType(data, name);
        return `// 生成的类型定义文件
${typeContent}

${interfaceContent}
`;
    }

    private static inferType(data: any): string {
        if (data === null) return 'null';
        if (data === undefined) return 'undefined';

        switch (typeof data) {
            case 'string':
                return this.inferStringLiteralType(data);
            case 'number':
                return this.inferNumberType(data);
            case 'boolean':
                return 'boolean';
            case 'object':
                if (Array.isArray(data)) {
                    return this.inferArrayType(data);
                }
                return this.inferObjectType(data);
            default:
                return 'any';
        }
    }

    private static inferStringLiteralType(value: string): string {
        // 检查是否是日期格式
        if (this.isDateString(value)) return 'Date';
        // 检查是否是邮箱格式
        if (this.isEmailString(value)) return 'string /* email */';
        // 检查是否是URL格式
        if (this.isUrlString(value)) return 'string /* url */';
        return 'string';
    }

    private static inferNumberType(value: number): string {
        if (Number.isInteger(value)) return 'number /* int */';
        return 'number';
    }

    private static inferArrayType(arr: any[]): string {
        if (arr.length === 0) return 'any[]';
        
        const elementTypes = new Set(arr.map(item => this.inferType(item)));
        if (elementTypes.size === 1) {
            return `${elementTypes.values().next().value}[]`;
        }
        return `(${Array.from(elementTypes).join(' | ')})[]`;
    }

    private static inferObjectType(obj: object): string {
        const properties: string[] = [];
        for (const [key, value] of Object.entries(obj)) {
            const propertyType = this.inferType(value);
            properties.push(`${key}: ${propertyType}`);
        }
        return `{\n${this.indent(properties.join(',\n'))}\n}`;
    }

    private static formatType(type: string, name: string): string {
        return `type ${name} = ${type};`;
    }

    private static formatInterface(type: string, name: string): string {
        if (!type.startsWith('{')) return this.formatType(type, name);
        return `interface ${name} ${type}`;
    }

    private static indent(str: string): string {
        return str.split('\n').map(line => `    ${line}`).join('\n');
    }

    private static isDateString(str: string): boolean {
        return !isNaN(Date.parse(str));
    }

    private static isEmailString(str: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
    }

    private static isUrlString(str: string): boolean {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    }
}

export default TypeInfer;