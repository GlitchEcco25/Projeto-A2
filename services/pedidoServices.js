const pedidos = [];
let proximoId = 1;

function criar(dados) {
    // Validações...
    if (typeof dados.cliente !== "string" || dados.cliente.trim() === "") {
        const erro = new Error("Cliente obrigatório!");
        erro.statusCode = 400;
        throw erro;
}

    if (typeof dados.valor !== "number" || dados.valor <= 0) {
        const erro = new Error("Valor inválido!");
        erro.statusCode = 400;
        throw erro;
}

const tiposPermitidos = ["entrega", "retirada"];

if (!tiposPermitidos.includes(dados.tipo)) {
    const erro = new Error("Tipo inválido!");
    erro.statusCode = 400;
    throw erro;
}

const prioridadesPermitidas = ["normal", "media", "alta"];

if (!prioridadesPermitidas.includes(dados.prioridade)) {
    const erro = new Error("Prioridade inválida!");
    erro.statusCode = 400;
    throw erro;
}

    const pedido = {
        id: proximoId++,
        cliente: dados.cliente.trim(),
        tipo: dados.tipo,
        valor: dados.valor,
        prioridade: dados.prioridade,
        status: "recebido"
    };

    pedidos.push(pedido); // Guarda o pedido
    return pedido;
}

function listar() {
    return pedidos;
}

function buscarPorId(id){
    return pedidos.find(pedido => pedido.id === Number(id));
}

function atualizarStatus(id, novoStatus){
    const pedido = buscarPorId(id);

    if(!pedido){
        return null;
    }

    const statusPermitidos = [
        "recebido",
        "preparando",
        "enviado",
        "entregue",
        "cancelado"
    ];

    const transicoes = {
    recebido: ["preparando", "cancelado"],
    preparando: ["enviado", "cancelado"],
    enviado: ["entregue"],
    entregue: [],
    cancelado: []
};

    if(!statusPermitidos.includes(novoStatus)){
        const erro = new Error("Status inválido.");
        erro.statusCode = 400;
        throw erro;
    }

    if (!transicoes[pedido.status].includes(novoStatus)) {
    throw new Error(
        `Não é permitido mudar de ${pedido.status} para ${novoStatus}.`

    );
}

    pedido.status = novoStatus;
    return pedido;
}

module.exports = { criar, listar, buscarPorId , atualizarStatus};