import { stringParaData} from"../util/DataUtil"; 

export class Paciente{
    id: number;
    name: string;
    cpf: string;
    dataNascimento: Date;
    telefone: number;
    endereco: string;

    constructor(id?:number, name?: string, cpf?:string, dataNascimento?: string, telefone?: number, endereco?: string){
        this.id = id || 0;
        this.name = name || '';
        this.cpf = cpf || '';
        this.dataNascimento = stringParaData(dataNascimento || '') ;
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }
}

