export function safeEnumValue<T extends readonly string[]>(options: T, value?: string): T[number] | undefined {
    if (value && options.includes(value)) {
        return value as T[number];
    }
    return undefined;
}
