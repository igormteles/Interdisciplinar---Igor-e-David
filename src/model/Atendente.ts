export class Atendente{
    id: number;
    name: string;
    login: string;
    constructor(id?: number, name?: string, login?: string){
        this.id = id || 0;
        this.name = name || '';
        this.login = login || '';
    }
}
