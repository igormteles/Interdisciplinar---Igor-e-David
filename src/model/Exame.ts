export class Exame{
    id: number;
    paciente: number;
    medico: number;

    constructor(id?: number, paciente?: number, medico?: number){
        this.id = id || 0;
        this.paciente = paciente || 0;
        this.medico = medico || 0;
    }
}