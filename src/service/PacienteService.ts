import { Paciente } from "../model/PacienteEntidade";
import { PacienteRepository } from "../repository/PacienteRepository";

export class PacienteService{
    private pacienteRepository = new PacienteRepository();

    async novoPaciente(pacienteData: any):Promise<Paciente>{
        const {name, cpf, dataNascimento} = pacienteData;

        let paciente = new Paciente(undefined,name,cpf, dataNascimento)

        if(paciente.cpf == null){
            throw new Error("Já existe um paciente cadastrado com esse CPF");
        }
        const novoPaciente = this.pacienteRepository.inserePaciente(paciente);
        console.log("Service - Insert", novoPaciente)

        return novoPaciente;
    }

    async atualizaPaciente(pacienteData: any):Promise<Paciente>{
        const {id, name, cpf, dataNascimento} = pacienteData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const paciente = new Paciente(id, name, cpf, dataNascimento);

        if(paciente.id == 0){
            throw new Error("Paciente informado inexistente.");
        }

        this.pacienteRepository.atualizaPaciente(paciente);
        return paciente;
    }

    async deletaPaciente(pacienteData: any):Promise<Paciente>{
        const {id, name, cpf, dataNascimento} = pacienteData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const paciente = new Paciente(id, name, cpf, dataNascimento);

        if(paciente.cpf == null){
            throw new Error("Paciente informado inexistente.");
        }
        const result:any = await this.pacienteRepository.deletaPaciente(paciente.id);
        return paciente;
    }

    async getPacienteCpf(pacienteData: any):Promise<Paciente>{
        const cpfNumber:string = pacienteData
        const paciente = await this.pacienteRepository.getPacienteCpf(cpfNumber);
        console.log("Service - Filtrar", paciente);
        return paciente;
    }

    async getPacienteId(pacienteData: any):Promise<Paciente>{
        const idNumber: number = parseInt(pacienteData,10);

        const paciente = await this.pacienteRepository.getPacienteId(idNumber);
        console.log("Service - Filtrar", paciente);
        return paciente;
    }

    async getPacientes():Promise<Paciente[]>{
        return this.pacienteRepository.listaPaciente();
    }
   
}