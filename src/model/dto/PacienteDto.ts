export class PacienteDto{
    id: number;
    name: string;
    cpf: string;
    dataNascimento: string;
    telefone: number;
    endereco: string;

    constructor(id:any, name: any, cpf:any, dataNascimento: any, telefone: any, endereco: any){
        this.id = id || 0;
        this.name = name || '';
        this.cpf = cpf || '';
        this.dataNascimento = dataNascimento || '' ;
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }
}

