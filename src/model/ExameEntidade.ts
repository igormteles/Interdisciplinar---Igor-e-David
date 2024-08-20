import { stringParaData} from "../util/DataUtil";

export class Exame{
    id: number;
    pacienteCpf: string;
    medicoCrm: number;
    data: Date;
    pacienteNome: string;
    medicoNome: string;
    

    constructor(id?: number, pacienteCpf?: string, medicoCrm?: number, data?: string, pacienteNome?: string, medicoNome?: string){
        this.id = id || 0;
        this.pacienteCpf = pacienteCpf || '';
        this.medicoCrm = medicoCrm || 0;
        this.data = stringParaData(data || '')
        this.pacienteNome = pacienteNome || ''
        this.medicoNome = medicoNome || ''
    }
}