export class Medico{
    id: number;
    crm: number;
    name: string;
    telefone: number;
    endereco: string;

    constructor(id?:number, crm?:number, name?: string, telefone?: number, endereco?: string){
        this.validaInformacoes(name, crm)
        this.id = id || 0;
        this.crm = crm || 0;
        this.name = name || '';
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
    }

    private validaInformacoes(name:any, crm:any){
        let error ='';
        if (typeof name !== 'string' || typeof crm !== 'number') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if(error != ''){
            throw new Error(error);
        }
    }
}