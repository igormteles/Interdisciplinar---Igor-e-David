import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class PacienteRequestDto{
    name: string;
    cpf: string;
    dataNascimento: string;
    telefone: number;
    endereco: string;

    constructor(name?: string, cpf?:string, dataNascimento?: string, telefone?: number, endereco?: string){
        this.name = name || '';
        this.cpf = cpf || '';
        this.dataNascimento = dataNascimento || '' ;
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }
}

