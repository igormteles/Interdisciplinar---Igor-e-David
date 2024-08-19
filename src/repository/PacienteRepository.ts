import { executarComandoSQL } from "../database/mysql";
import { Paciente } from "../model/PacienteEntidade"; 
export class PacienteRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS interdisciplinar.paciente (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                name VARCHAR(255) NOT NULL,
                cpf VARCHAR(14) NOT NULL,
                dataNascimento DATE NOT NULL,
                telefone INT(11) NOT NULL,
                endereco VARCHAR(255) NOT NULL
            )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            //console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async inserePaciente(paciente: Paciente):Promise<Paciente>{
        try {
            const resultado = await executarComandoSQL(
                "INSERT INTO interdisciplinar.paciente (name, cpf, dataNascimento, telefone, endereco) VALUES (?,?,?,?,?)",
                [paciente.name, paciente.cpf, paciente.dataNascimento, paciente.telefone, paciente.endereco]
            );
            paciente.id = resultado.insertId;
            console.log('Paciente criado com sucesso:', paciente);
            return paciente;
        } catch (err) {
            console.error('Erro ao criar um paciente: ', err);
            throw err;
        }
    }

    async atualizaPaciente(paciente: Paciente): Promise<void> {
        try {
            const query = "UPDATE interdisciplinar.paciente SET name = ?, cpf = ?, dataNascimento = ?, telefone = ?, endereco = ? WHERE id = ?";
            await executarComandoSQL(query, [paciente.name, paciente.cpf, paciente.dataNascimento, paciente.telefone, paciente.endereco, paciente.id]);
            console.log('Paciente atualizado com sucesso:', paciente.id);
        } catch (err) {
            console.error('Erro ao atualizar paciente:', err);
            throw err;
        }
    }

    async getPacienteCpf(cpf?:string): Promise<Paciente[]> {
        let query = "SELECT * FROM interdisciplinar.paciente WHERE";
        const params: any[] = [];
        

        if (cpf) {
            query += " cpf = ?";
            params.push(cpf);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido");
        }

        try {
            const result: Paciente[] = await executarComandoSQL(query, params);
            console.log('Busca efetuada com sucesso:', result);
            return result;
        } catch (err) {
            console.error('Erro ao buscar cliente:', err);
            throw err;
        }
    }

    async getPacienteId(id?:number): Promise<Paciente[]> {
        let query = "SELECT * FROM interdisciplinar.paciente WHERE";
        const params: any[] = [];
        
        if (id) {
            query += " id = ?";
            params.push(id);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido");
        }

        try {
            const result: Paciente[] = await executarComandoSQL(query, params);
            console.log('Busca efetuada com sucesso:', result);
            return result;
        } catch (err) {
            console.error('Erro ao buscar cliente:', err);
            throw err;
        }
    }

    async deletaPaciente(pacienteId: number): Promise<void> {
        try {
            const query = "DELETE FROM interdisciplinar.paciente WHERE id = ?";
            await executarComandoSQL(query, [pacienteId]);
            console.log('Paciente deletado com sucesso:', pacienteId);
        } catch (err) {
            console.error('Erro ao deletar paciente:', err);
            throw err;
        }
    }

    async listaPaciente(): Promise<Paciente[]> {
        try {
            const query = "SELECT * FROM interdisciplinar.paciente";
            const result: Paciente[] = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error('Erro ao listar os pacientes:', err);
            throw err;
        }
    }

}