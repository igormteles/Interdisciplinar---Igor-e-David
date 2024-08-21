export class ExameDto{
    id: number;
    pacienteCpf: number;
    medicoID: number;
    data: string;
    pacienteNome: string;
    medicoNome: string; 

    constructor(id: any, pacienteCpf: any, medicoID: any, data: any, pacienteNome: any, medicoNome: any){
        this.id = id || 0;
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = data || '';
        this.pacienteNome = pacienteNome || '';
        this.medicoNome = medicoNome || '';
    }
}