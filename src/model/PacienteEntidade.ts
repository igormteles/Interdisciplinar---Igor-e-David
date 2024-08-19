import { stringParaData, verificaFormatoData } from "../util/DataUtil";

export class Paciente{
    id: number;
    name: string;
    cpf: string;
    dataNascimento: Date;
    telefone: number;
    endereco: string;

    constructor(id?:number, name?: string, cpf?:string, dataNascimento?: string, telefone?: number, endereco?: string){
        this.validaInformacoes(name, cpf, dataNascimento)
        this.id = id || 0;
        this.name = name || '';
        this.cpf = cpf || '';
        this.dataNascimento = stringParaData(dataNascimento || '') ;
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }

    private validaInformacoes(name:any, cpf:any, dataNascimento:any){
        let error ='';
        if (typeof name !== 'string' || typeof cpf !== 'string' || typeof dataNascimento !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(!verificaFormatoData(dataNascimento)){
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}

