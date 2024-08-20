export class ExameDto{
    id: number;
    pacienteCpf: number;
    medicoID: number;
    data: string;

    constructor(id: any, pacienteCpf: any, medicoID: any, data: any){
        this.id = id || 0;
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = data || '';
    }
}