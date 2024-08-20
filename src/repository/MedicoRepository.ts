import { executarComandoSQL } from "../database/mysql";
import { Medico } from "../model/MedicoEntidade"; 
//
export class MedicoRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS interdisciplinar.medico (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                crm INT NOT NULL,
                name VARCHAR(255) NOT NULL,
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

    async insereMedico(medico: Medico):Promise<Medico>{
        const query = "INSERT INTO interdisciplinar.medico (crm, name, telefone, endereco) VALUES (?,?,?,?)"
        try {
            const resultado = await executarComandoSQL(query, [medico.crm, medico.name, medico.telefone, medico.endereco]);
            console.log('Medico criado com sucesso:', resultado.isertID);
            medico.id = resultado.insertID
            return new Promise<Medico>((resolve)=>{
                resolve(medico);
            });
        } catch (err) {
            console.error('Erro ao criar um medico: ', err);
            throw err;
        }
    }

    async atualizaMedico(medico: Medico): Promise<void> {
        try {
            const query = "UPDATE interdisciplinar.medico SET crm = ?, name = ?, telefone = ?, endereco = ? WHERE id = ?";
            await executarComandoSQL(query, [medico.crm, medico.name, medico.telefone, medico.endereco, medico.id]);
            console.log('Medico atualizado com sucesso:', medico.id);
        } catch (err) {
            console.error('Erro ao atualizar medico:', err);
            throw err;
        }
    }

    async getMedicoCrm(crm?:number): Promise<Medico[]> {
        let query = "SELECT * FROM interdisciplinar.medico WHERE";
        const params: any[] = [];
        
        if (crm) {
            query += " crm = ?";
            params.push(crm);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido");
        }

        try {
            const result: Medico[] = await executarComandoSQL(query, params);
            console.log('Busca efetuada com sucesso:', result);
            return result;
        } catch (err) {
            console.error('Erro ao buscar cliente:', err);
            throw err;
        }
    }

    async getMedicoId(id?:number): Promise<Medico> {
        let query = "SELECT * FROM interdisciplinar.medico WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Pessoa localizada com sucesso, ID: ', resultado);
            return new Promise<Medico>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar pessoa de ID ${id} gerando o erro: ${err}`);
            throw err;
        }    
    }

    async deletaMedico(medicoId: number): Promise<void> {
        try {
            const query = "DELETE FROM interdisciplinar.medico WHERE id = ?";
            await executarComandoSQL(query, [medicoId]);
            console.log('Medico deletado com sucesso:', medicoId);
        } catch (err) {
            console.error('Erro ao deletar medico:', err);
            throw err;
        }
    }

    async listaMedico(): Promise<Medico[]> {
        try {
            const query = "SELECT * FROM interdisciplinar.medico";
            const result: Medico[] = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error('Erro ao listar os medicos:', err);
            throw err;
        }
    }

}