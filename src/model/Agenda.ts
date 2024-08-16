import { stringParaDataTempo } from "../util/DataUtil";


export class Agenda{
    id: number;
    pacienteID: number;

    constructor(id?: number, pacienteID?: number){
        this.id = id || 0;
        this.pacienteID = pacienteID || 0;
    }
}