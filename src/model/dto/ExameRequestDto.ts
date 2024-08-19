import { stringParaData} from "../../util/DataUtil";

export class ExameRequestDto{
    pacienteCpf: number;
    medicoID: number;
    data: Date;

    constructor(pacienteCpf?: number, medicoID?: number, data?: string){
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = stringParaData(data || '')
    }
}