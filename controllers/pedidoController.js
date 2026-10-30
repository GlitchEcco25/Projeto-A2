
const pedidoService = require('../services/pedidoServices');

function criar(req, res) {
    try {
        const pedido = pedidoService.criar(req.body);
        return res.status(201).json(pedido);
    } catch (error) {
        return res.status(400).json({
            erro: error.message
        });
    }
}

function listar(req, res){
    const pedidos = pedidoService.listar();
    return res.status(200).json(pedidos);
}

function buscarPorId(req, res){
    const pedido = pedidoService.buscarPorId(req.params.id);

    if(!pedido){
        return res.status(404).json({
            erro: "Pedido não encontrado"
        });
    }

    return res.status(200).json(pedido);
}

function atualizarStatus(req, res) {
    try {
        const pedido = pedidoService.atualizarStatus(
            req.params.id,
            req.body.status
        );

        console.log("5. Resultado:", pedido);

        if (!pedido) {
            return res.status(404).json({
                erro: "O pedido não foi encontrado"
            });
        }

        return res.status(200).json(pedido);
    } catch (error) {
        console.log("Erro:", error.message);

        return res.status(400).json({
            erro: error.message
        });
    }
}

module.exports = { criar, listar, buscarPorId, atualizarStatus };
