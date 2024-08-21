export class MedicoRequestDto{
    crm: number;
    name: string;
    telefone: number;
    endereco: string;
    
    constructor(crm?:number, name?: string, telefone?: number, endereco?: string){
        this.crm = crm || 0;
        this.name = name || '';
        this.telefone = telefone || 0;
        this.endereco = endereco || '';
        
    }

}