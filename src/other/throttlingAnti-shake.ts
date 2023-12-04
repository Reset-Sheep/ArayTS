type ThrottleCallback = (...args: any[]) => void;
type DebounceCallback = (...args: any[]) => void;

const throttle = (callback: ThrottleCallback, delay: number): ThrottleCallback => {
    let isThrottled = false;

    return (...args: any[]): void => {
        if (!isThrottled) {
            callback(...args);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
};

const debounce = (callback: DebounceCallback, delay: number): DebounceCallback => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]): void => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};
export { throttle,debounce };
