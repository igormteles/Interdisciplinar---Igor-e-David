import { stringParaData} from "../../util/DataUtil";

export class ExameDto{
    id: number;
    pacienteCpf: number;
    medicoID: number;
    data: Date;

    constructor(id?: number, pacienteCpf?: number, medicoID?: number, data?: string){
        this.id = id || 0;
        this.pacienteCpf = pacienteCpf || 0;
        this.medicoID = medicoID || 0;
        this.data = stringParaData(data || '')
    }
}