export class ExameRequestDto{
    pacienteCpf: number;
    medicoID: number;
    data: string;

    constructor(pacienteCpf?: number, medicoID?: number, data?: string){
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = data || '';
    }
}