export class ExameRequestDto{
    pacienteCpf: number;
    medicoID: number;
    data: string;
    pacienteNome: string;
    medicoNome: string;

    constructor(pacienteCpf?: number, medicoID?: number, data?: string, pacienteNome?: string, medicoNome?: string){
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = data || '';
        this.pacienteNome = pacienteNome || '';
        this.medicoNome = medicoNome || '';
    }
}