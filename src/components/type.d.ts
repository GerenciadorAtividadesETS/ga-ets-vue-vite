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

export type Subjects = {
    id: number,
    name: string ,
    professor: string ,
    color: string,
    border:  string,
}
type ReturningString = () => String | undefined;

