#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import TypeInfer from './typeInfer';
import { register } from 'ts-node';

const program = new Command();

program
    .name('arayts')    // 修改这里
    .description('TypeScript 类型推导生成工具')
    .version('1.0.0');

interface ArayTSConfig {
    input: {
        path: string;
        watch: boolean;
    };
    output: {
        path: string;
        typeName: string;
        namespace: string;
    };
    options: {
        generateInterface: boolean;
        interfacePrefix: string;
        addComments: boolean;
    };
}

function loadConfig(): ArayTSConfig {
    const defaultConfig: ArayTSConfig = {
        input: {
            path: "./example/data.json",
            watch: false
        },
        output: {
            path: "./types.ts",
            typeName: "Generated",
            namespace: "Types"
        },
        options: {
            generateInterface: true,
            interfacePrefix: "I",
            addComments: true
        }
    };

    try {
        // 注册 ts-node 以支持导入 .ts 文件
        register();
        
        const configPath = path.resolve(process.cwd(), 'arayts.config.ts');
        console.log('📑 尝试加载配置文件:', configPath);
        
        if (fs.existsSync(configPath)) {
            const userConfig = require(configPath).default;
            console.log('🔍 解析后的配置:', userConfig);
            
            const mergedConfig = {
                input: { ...defaultConfig.input, ...userConfig.input },
                output: { ...defaultConfig.output, ...userConfig.output },
                options: { ...defaultConfig.options, ...userConfig.options }
            };
            
            console.log('🔄 最终使用的配置:', mergedConfig);
            return mergedConfig;
        } else {
            console.warn('⚠️ 未找到配置文件，使用默认配置');
        }
    } catch (error) {
        console.error('❌ 配置文件加载失败:', error);
        console.error('详细错误:', error instanceof Error ? error.stack : String(error));
    }
    return defaultConfig;
}

program
    .command('generate')
    .description('从 JSON 文件生成类型定义')
    .argument('[source]', 'JSON 源文件路径（可选，优先使用配置文件）')
    .option('-o, --output <path>', '输出文件路径')
    .option('-n, --name <name>', '生成的类型名称')
    .allowExcessArguments(false)
    .action(async (source, options) => {
        try {
            const config = loadConfig();
            const inputPath = source || config.input.path;
            const outputPath = options.output || config.output.path;
            const typeName = options.name || config.output.typeName;

            console.log('🔧 当前配置:', {
                inputPath,
                outputPath,
                typeName
            });
            
            console.log('📂 正在读取文件:', path.resolve(process.cwd(), inputPath));
            const jsonContent = fs.readFileSync(inputPath, 'utf-8');
            const data = JSON.parse(jsonContent);
            
            const typeContent = TypeInfer.generateTypeDefinition(data, typeName);
            
            const resolvedOutputPath = path.resolve(process.cwd(), outputPath);
            const outputDir = path.dirname(resolvedOutputPath);
            
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(resolvedOutputPath, typeContent);
            console.log(`✨ 类型文件已生成: ${resolvedOutputPath}`);
        } catch (error) {
            console.error('❌ 生成失败:', error);
            process.exit(1);
        }
    });

program
    .command('watch')
    .description('监听 JSON 文件变化并自动生成类型')
    .argument('<source>', 'JSON 源文件路径')
    .option('-o, --output <path>', '输出文件路径', './generated/types.ts')
    .option('-n, --name <name>', '生成的类型名称', 'Generated')
    .action((source, options) => {
        const generate = () => {
            try {
                const jsonContent = fs.readFileSync(source, 'utf-8');
                const data = JSON.parse(jsonContent);
                const typeContent = TypeInfer.generateTypeDefinition(data, options.name);
                
                const outputDir = path.dirname(options.output);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                fs.writeFileSync(options.output, typeContent);
                console.log(`✨ 类型文件已更新: ${options.output}`);
            } catch (error) {
                console.error('❌ 更新失败:', error);
            }
        };

        console.log(`👀 正在监听文件变化: ${source}`);
        generate();
        fs.watch(source, (eventType) => {
            if (eventType === 'change') {
                generate();
            }
        });
    });

// 添加这行在文件末尾
program.parse(process.argv);
export default program;