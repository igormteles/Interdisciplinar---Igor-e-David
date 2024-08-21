import { Exame } from "../model/ExameEntidade";
import { ExameRepository } from "../repository/ExameRepository";
import { PacienteService } from "./PacienteService";
import { MedicoService } from "./MedicoService";


export class ExameService{
    private exameRepository = new ExameRepository();
    private pacienteService = new PacienteService();
    private medicoService = new MedicoService();

    async novoExame(exameData: any):Promise<Exame>{
        const {pacienteCpf, medicoID, data} = exameData;

        let paciente = await this.pacienteService.getPacienteCpf(pacienteCpf)
        let medico = await this.medicoService.getMedicoId(medicoID)

        if(paciente && medico){
            let exame = new Exame(undefined, pacienteCpf, medicoID, data, paciente.name, medico.name)
            const novoExame = await this.exameRepository.insereExame(exame);
            console.log("Service - Insert", novoExame)
            return novoExame;
        }
        else{
            throw new Error ("Medico e/ou Paciente não encontrado(s).")
        }
        
    }

    async atualizaExame(exameData: any):Promise<Exame>{
        const {id, pacienteCpf, medicoId, data} = exameData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const exame = new Exame(id, pacienteCpf, medicoId, data);

        const ExamesEncontrados: Exame[]= await this.exameRepository.getExameId(id)

        if(ExamesEncontrados.length == 0){
            throw new Error("Exame informado inexistente.");
        }

        this.exameRepository.atualizaExame(exame);
        return exame;
    }

    async deletaExame(exameData: any):Promise<Exame>{
        const {id, pacienteCpf, medicoId, data} = exameData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const exame = new Exame(id, pacienteCpf, medicoId, data);
        const result:any = await this.exameRepository.deletaExame(exame.id);
        return exame;
    }

    async getExameId(id:any):Promise<Exame|null>{
        const idNumber: number = parseInt(id,10);

        const result:Exame[] = await this.exameRepository.getExameId(idNumber);
        if(result.length > 0){
            return result[0];
        }
        return null
    }

    async getExames():Promise<Exame[]>{
        return this.exameRepository.listaExame();
    }
   
}