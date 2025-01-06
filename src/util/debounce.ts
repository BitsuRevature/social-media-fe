export const debounce = <T extends (...args: any[]) => void>(fn: T, t: number = 1000) => {
    let i: ReturnType<typeof setTimeout>; // Properly typed for `setTimeout`
    return function (this: unknown, ...args: Parameters<T>): void {
        clearTimeout(i);
        i = setTimeout(() => {
            fn.apply(this, args);
        }, t);
    };
};
