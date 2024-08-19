import { Paciente } from "../model/PacienteEntidade";
import { PacienteRepository } from "../repository/PacienteRepository";
import { calculaDiferencaDiasEntreDatas} from "../util/DataUtil";

export class PacienteService{
    private pacienteRepository = new PacienteRepository();

    async novoPaciente(pacienteData: any):Promise<Paciente>{
        const {name, cpf, dataNascimento} = pacienteData;

        let paciente = new Paciente(undefined,name,cpf, dataNascimento)

        const pacientesEncontrados: Paciente[]= await this.pacienteRepository.getPacienteCpf(paciente.cpf)

        if(pacientesEncontrados.length > 0){
            throw new Error("Já existe um paciente cadastrado com esse CPF");
        }
        
        const idade = calculaDiferencaDiasEntreDatas(paciente.dataNascimento, new Date())

        if(idade < 18){
            throw new Error("Paciente deve possuir idade maior que 18 anos.");
        }

        return this.pacienteRepository.inserePaciente(paciente);
    }

    async atualizaPaciente(pacienteData: any):Promise<Paciente>{
        const {id, name, cpf, dataNascimentoString} = pacienteData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const paciente = new Paciente(id, name, cpf, dataNascimentoString);

        const pacientesEncontrados: Paciente[]= await this.pacienteRepository.getPacienteCpf(cpf)

        if(pacientesEncontrados.length == 0){
            throw new Error("Paciente informado inexistente.");
        }

        this.pacienteRepository.atualizaPaciente(paciente);
        return paciente;
    }

    async deletaPaciente(pacienteData: any):Promise<Paciente>{
        const {id, name, cpf, dataNascimentoString} = pacienteData;

        if (typeof id !== 'number' ) {
            throw new Error("Informe um ID correto.");
        }
        const paciente = new Paciente(id, name, cpf, dataNascimentoString);
        const pacientesEncontrados: Paciente[]= await this.pacienteRepository.getPacienteCpf(paciente.cpf)

        if(pacientesEncontrados.length == 0){
            throw new Error("Paciente informado inexistente.");
        }
        const result:any = await this.pacienteRepository.deletaPaciente(paciente.id);
        return paciente;
    }

    async getPacienteCpf(cpf:any):Promise<Paciente|null>{

        const result:Paciente[] = await this.pacienteRepository.getPacienteCpf(cpf);
        if(result.length > 0){
            return result[0];
        }
        return null
    }

    async getPacienteId(id:any):Promise<Paciente|null>{
        const idNumber: number = parseInt(id,10);

        const result:Paciente[] = await this.pacienteRepository.getPacienteId(idNumber);
        if(result.length > 0){
            return result[0];
        }
        return null
    }

    async getPacientes():Promise<Paciente[]>{
        return this.pacienteRepository.listaPaciente();
    }
   
}