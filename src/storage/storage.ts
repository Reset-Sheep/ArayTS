// storage.ts

const functionMap: Record<string, Function> = {};

const Storage = {
    save: function (functionName: string, existingFunction: Function): void {
        const functionSource = existingFunction.toString();
        functionMap[functionName] = new Function('return ' + functionSource)();
    },
    get: function (functionName: string): Function {
        return functionMap[functionName];
    },
    remove: function (functionName: string): void {
        delete functionMap[functionName];
    },
    clear: function (): void {
        for (const key in functionMap) {
            delete functionMap[key];
        }
    },
};
export default Storage;
