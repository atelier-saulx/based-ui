export default function useInputValue<T = string | number | undefined>(value: T, identifier: any, noExternalUpdate: boolean): [T, (value: T) => void];
