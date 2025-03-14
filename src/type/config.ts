export interface TypeInferConfig {
    source: string;
    output: string;
    name?: string;
    watch?: boolean;
    prettier?: {
        semi: boolean;
        singleQuote: boolean;
        tabWidth: number;
    };
}