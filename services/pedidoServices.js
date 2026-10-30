const pedidos = [];
let proximoId = 1;

function criar(dados) {
    // Validações...
    if (typeof dados.cliente !== "string" || dados.cliente.trim() === "") {
    throw new Error("Cliente obrigatório!");
}

    if (typeof dados.valor !== "number" || dados.valor <= 0) {
    throw new Error("Valor deve ser numérico e maior que zero.");
}

const tiposPermitidos = ["entrega", "retirada"];

if (!tiposPermitidos.includes(dados.tipo)) {
    throw new Error("Tipo inválido.");
}

const prioridadesPermitidas = ["normal", "media", "alta"];

if (!prioridadesPermitidas.includes(dados.prioridade)) {
    throw new Error("Prioridade inválida.");
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