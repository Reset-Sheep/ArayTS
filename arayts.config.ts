import * as fs from 'fs';
import * as path from 'path';

const config = {
    input: {
        path: "./example/data.json",
        watch: false
    },
    output: {
        path: "./example/generated.ts",
        typeName: "Generated",
        namespace: "Types"
    },
    options: {
        generateInterface: true,
        interfacePrefix: "I",
        addComments: true
    }
};

export default config;