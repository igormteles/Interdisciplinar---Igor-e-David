import { Medico } from "../model/MedicoEntidade";
import { MedicoRepository } from "../repository/MedicoRepository";

export class MedicoService{
    private medicoRepository = new MedicoRepository();

    async novoMedico(medicoData: any):Promise<Medico>{
        const {id, crm, name, telefone, endereco} = medicoData;

        let medico = new Medico(id, crm, name, telefone, endereco)

        if(medico.id == null){
            throw new Error("Medico ja cadastrado")
        }
        const novoMedico = await this.medicoRepository.insereMedico(medico);
        console.log("service - Inser", novoMedico)

        return novoMedico;
    }

    async atualizaMedico(medicoData: any):Promise<Medico>{
        const {id, crm, name, telefone, endereco} = medicoData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const medico = new Medico(id, crm, name, telefone, endereco);

        this.medicoRepository.atualizaMedico(medico);
        return medico;
    }

    async deletaMedico(medicoData: any):Promise<Medico>{
        const {id, crm, name, telefone, endereco} = medicoData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const medico = new Medico(id, crm, name, telefone, endereco);
        const medicosEncontrados: Medico[]= await this.medicoRepository.getMedicoCrm(medico.crm)

        if(medicosEncontrados.length == 0){
            throw new Error("Medico informado inexistente.");
        }
        const result:any = await this.medicoRepository.deletaMedico(medico.id);
        return medico;
    }

    async getMedicoCrm(medicoData: any):Promise<Medico|null>{
        const crmNumber = parseInt(medicoData,10);

        const medico = await this.medicoRepository.getMedicoId(crmNumber);
        console.log("Service - Filtrar", medico);
        return medico;
    }

    async getMedicoId(id:any):Promise<Medico|null>{
        const idNumber: number = parseInt(id,10);

        const medico = await this.medicoRepository.getMedicoId(idNumber);
        console.log("Service - Filtrar", medico);
        return medico;
    }

    async getMedicos():Promise<Medico[]>{
        return this.medicoRepository.listaMedico();
    }
   
}