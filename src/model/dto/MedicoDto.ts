export class MedicoDto{
    id: number;
    crm: number;
    name: string;
    telefone: number;
    endereco: string;

    constructor(id:any, crm:any, name: any, telefone: any, endereco: any){
        this.id = id || 0;
        this.crm = crm || 0;
        this.name = name || '';
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }

    
}