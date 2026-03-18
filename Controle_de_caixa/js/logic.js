// Função pura para calcular o saldo total de uma lista de transações
function calcularSaldo(transacoes) {
    let saldo = 0;
    for (let i = 0; i < transacoes.length; i++) {
        if (transacoes[i].tipo === 'entrada') {
            saldo += transacoes[i].valor;
        } else if (transacoes[i].tipo === 'saida') {
            saldo -= transacoes[i].valor;
        }
    }
    return saldo;
}

// Exportando para poder usar nos testes automatizados no futuro
// (O try-catch evita erros no navegador, já que o module.exports é do Node.js)
try {
    module.exports = { calcularSaldo };
} catch (e) {
    // Ignora o erro no ambiente do navegador
}