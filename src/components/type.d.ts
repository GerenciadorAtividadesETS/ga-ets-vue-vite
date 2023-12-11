
export type User = {
    id?: number,
    edv: string,
    nome: string,
    cor: string,
    turma: number
}

export type Field = {
    name?: string
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
    nome: string ,
    cor: string,
    border:  string,
}

export type Activity = {
    id: number,
    idUsuario: string,
    idMateria: number,
    titulo: string,
    descricao: string,
    dataCriacao: string,
    dataEntrega?: string,
    cor: string,
}

export type Answer = {
    id: number,
    idUsuario: number,
    idAtividade: number,
    dataAlteracao?: string,
    dataEntrega?: string,
    compartilhado?: string,
    github?:string,
    comentario?: string,
}

export type Table = {

    headers: Headers[],
    contents?: Contents[],
    
}
type Headers = { value: string, aditional?: string, show?: boolean}

type Contents = {value: string, function?: ()=> undefined, icon?: string, editable?: boolean}
type StringFunction = (string | ReturningString)[]

type ReturningString = () => String | undefined;

