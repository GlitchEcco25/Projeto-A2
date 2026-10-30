const tecnicos = [
    {
        nome:"João da Silva",
        especialidade:"redes"
    },
    {
        nome:"Maria Santos",
        especialidade:"software"
    },
    {
        nome:"Carlos Lima",
        especialidade:"hardware"
    }
]

function buscaPorEspecialidade(especialidade){
    return tecnicos.find(tecnico => tecnico.especialidade === especialidade)
}

module.exports = {
    buscaPorEspecialidade
}