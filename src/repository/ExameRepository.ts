import { executarComandoSQL } from "../database/mysql";
import { Exame } from "../model/ExameEntidade"; 

export class ExameRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS interdisciplinar.exame (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                pacienteCpf VARCHAR(14) NOT NULL,
                medicoCrm INT NOT NULL,
                data DATE NOT NULL,
                pacienteNome VARCHAR(255) NOT NULL,
                medicoNome VARCHAR(255) NOT NULL
            )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            //console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insereExame(exame: Exame):Promise<Exame>{
        const query = "INSERT INTO interdisciplinar.exame (pacienteCpf, medicoCrm, data, pacienteNome, medicoNome) VALUES (?,?,?,?,?)";
        try {
            const resultado = await executarComandoSQL(query, [exame.pacienteCpf, exame.medicoCrm, exame.data, exame.pacienteNome, exame.medicoNome]);
            exame.id = resultado.insertId;
            console.log('exame criado com sucesso:', resultado.isertID);
            return new Promise<Exame>((resolve)=>{
                resolve(exame)
            });
        } catch (err) {
            console.error('Erro ao criar um exame: ', err);
            throw err;
        }
    }

    async atualizaExame(exame: Exame): Promise<void> {
        try {
            const query = "UPDATE interdisciplinar.exame SET pacienteCpf = ?, medicoCrm = ?, data = ?, pacienteNome = ?, medicoNome = ? WHERE id = ?";
            await executarComandoSQL(query, [exame.pacienteCpf, exame.medicoCrm, exame.data, exame.pacienteNome, exame.medicoNome, exame.id]);
            console.log('exame atualizado com sucesso:', exame.id);
        } catch (err) {
            console.error('Erro ao atualizar exame:', err);
            throw err;
        }
    }

    async getExameId(id?:number): Promise<Exame[]> {
        let query = "SELECT * FROM interdisciplinar.exame WHERE";
        const params: any[] = [];
        
        if (id) {
            query += " id = ?";
            params.push(id);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido");
        }

        try {
            const result: Exame[] = await executarComandoSQL(query, params);
            console.log('Busca efetuada com sucesso:', result);
            return result;
        } catch (err) {
            console.error('Erro ao buscar cliente:', err);
            throw err;
        }
    }

    async deletaExame(exameId: number): Promise<void> {
        try {
            const query = "DELETE FROM interdisciplinar.exame WHERE id = ?";
            await executarComandoSQL(query, [exameId]);
            console.log('exame deletado com sucesso:', exameId);
        } catch (err) {
            console.error('Erro ao deletar exame:', err);
            throw err;
        }
    }

    async listaExame(): Promise<Exame[]> {
        try {
            const query = "SELECT * FROM interdisciplinar.exame";
            const result: Exame[] = await executarComandoSQL(query, []);
            return result;
        } catch (err) {
            console.error('Erro ao listar os exames:', err);
            throw err;
        }
    }

}