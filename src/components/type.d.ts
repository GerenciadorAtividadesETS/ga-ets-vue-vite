export type Fields = {
    name: string
    value: string,
    placeholder?: string,
    type?: string,
    required?: boolean,
    min?: number,
    max?: number,
    error?: string,
    specificValidator?: ReturningString;
}
type ReturningString = () => String | undefined;