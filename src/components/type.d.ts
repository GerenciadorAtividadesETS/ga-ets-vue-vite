
export type User = {
    edv: string,
    name: stiring,
    color: string,
    class: number
}

export type Field = {
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

export type Subject = {
    id: number,
    name: string ,
    color: string,
    border:  string,
}

export type Activity = {
    id: number,
    professor: string,
    title: string,
    description: string,
    createdDate: Date,
    dueDate?: Date,
    color: string,
}

export type Answer = {
    id: number,
    lastChangeDate: Date,
    compartilhadoLink?: string,
    github?:string,
    commit?: string
}

export type Table = {

    headers: Headers[],
    contents?: Contents[],
    
}
type Headers = { value: string, aditional?: string, show?: boolean}

type Contents = {value: string, function?: ()=> undefined, icon?: string}
type StringFunction = (string | ReturningString)[]

type ReturningString = () => String | undefined;

