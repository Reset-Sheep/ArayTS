interface IStorage {
    saveFunction(name: string, func: Function): void;
    getFunction(name: string): Function | undefined;
    // other methods...
}
class FunctionStorage {

    private functionMap: Record<string, Function> = {};

    save(functionName: string, existingFunction: Function): void {
        const functionSource = existingFunction.toString();
        this.functionMap[functionName] = new Function('return ' + functionSource)();
    }

    get(functionName: string): Function {
        return this.functionMap[functionName];
    }

    remove(functionName: string): void {
        delete this.functionMap[functionName];
    }

    clear(): void {
        this.functionMap = {};
    }
}
const Storage = new FunctionStorage();

export default Storage;
