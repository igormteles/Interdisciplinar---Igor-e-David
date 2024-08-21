export function stringParaData(dataString: string): Date {
    const partes = dataString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    let data = new Date(ano, mes, dia);

    if (isNaN(data.getTime())) {
        throw new Error("Data inválida");
    }
    return data;
}

