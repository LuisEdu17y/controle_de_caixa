let transacoes = JSON.parse(localStorage.getItem('controleCaixa_transacoes')) || [];

function adicionarTransacaoLogic(descricao, valor, tipo) {
    const novaTransacao = {
        id: Date.now(),
        descricao,
        valor: parseFloat(valor),
        tipo
    };
    transacoes.push(novaTransacao);
    salvarNoLocalStorage();
}

function removerTransacaoLogic(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    salvarNoLocalStorage();
}

function calcularSaldo() {
    return transacoes.reduce((acc, t) => t.tipo === 'entrada' ? acc + t.valor : acc - t.valor, 0);
}

function obterTransacoes() {
    return transacoes;
}

function salvarNoLocalStorage() {
    localStorage.setItem('controleCaixa_transacoes', JSON.stringify(transacoes));
}

async function buscarCotacoesMultiplas() {
    try {
        const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        const data = await res.json();
        
        return {
            USD: parseFloat(data.USDBRL.bid),
            EUR: parseFloat(data.EURBRL.bid),
            BTC: parseFloat(data.BTCBRL.bid)
        };
    } catch (e) {
        console.error("Erro ao buscar cotações:", e);
        return null;
    }
}