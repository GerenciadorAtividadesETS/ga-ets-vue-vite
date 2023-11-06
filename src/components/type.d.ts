import { List } from "postcss/lib/list";

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
    id: number,
    headers: Headers[],
    contents?: StringFunction,
    
}
type Headers = { value: string, aditional: string | undefined, show: boolean | undefined }

type StringFunction = (string | ReturningString)[]

type ReturningString = () => String | undefined;

