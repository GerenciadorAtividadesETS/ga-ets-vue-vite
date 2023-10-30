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

type ReturningString = () => String | undefined;

