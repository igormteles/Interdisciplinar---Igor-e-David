import { Medico } from "../model/MedicoEntidade";
import { MedicoRepository } from "../repository/MedicoRepository";

export class MedicoService{
    private medicoRepository = new MedicoRepository();

    async novoMedico(medicoData: any):Promise<Medico>{
        const {id, crm, name, telefone, endereco} = medicoData;

        let medico = new Medico(id, crm, name, telefone, endereco)

        const medicosEncontrados: Medico[]= await this.medicoRepository.getMedicoId(medico.id)

        if(medicosEncontrados.length > 0){
            throw new Error("Já existe um medico cadastrado com esse CPF");
        }


        return this.medicoRepository.insereMedico(medico);
    }

    async atualizaMedico(medicoData: any):Promise<Medico>{
        const {id, crm, name, telefone, endereco} = medicoData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const medico = new Medico(id, crm, name, telefone, endereco);

        const medicosEncontrados: Medico[]= await this.medicoRepository.getMedicoCrm(crm)

        if(medicosEncontrados.length == 0){
            throw new Error("Medico informado inexistente.");
        }

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

    async getMedicoCrm(id:any):Promise<Medico|null>{
        const idNumber: number = parseInt(id,10);

        const result:Medico[] = await this.medicoRepository.getMedicoId(idNumber);
        if(result.length > 0){
            return result[0];
        }
        return null
    }

    async getMedicoId(id:any):Promise<Medico|null>{
        const idNumber: number = parseInt(id,10);

        const result:Medico[] = await this.medicoRepository.getMedicoId(idNumber);
        if(result.length > 0){
            return result[0];
        }
        return null
    }

    async getMedicos():Promise<Medico[]>{
        return this.medicoRepository.listaMedico();
    }
   
}