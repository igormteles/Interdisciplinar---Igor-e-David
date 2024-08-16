import mysql, { Connection } from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3350,
    user: 'root',
    password: 'mysql',
    database: 'interdisciplinar'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

export function executarComandoSQL(query: string, valores: any[]) : Promise<any> {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado:any) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err); 
                return;
            }
            resolve(resultado); 
        });
    });
}
