/* global calcularSaldo */

// Array para armazenar as transações na memória
let listaDeTransacoes = [];

// Elementos da tela
const form = document.getElementById('form-transacao');
const inputDescricao = document.getElementById('descricao');
const inputValor = document.getElementById('valor');
const selectTipo = document.getElementById('tipo');
const displaySaldo = document.getElementById('saldo-valor');
const ulTransacoes = document.getElementById('ul-transacoes');

// Evento de submissão do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarregar a página

    // 1. Criar o objeto da transação
    const novaTransacao = {
        descricao: inputDescricao.value,
        valor: parseFloat(inputValor.value),
        tipo: selectTipo.value
    };

    // 2. Adicionar na lista
    listaDeTransacoes.push(novaTransacao);

    // 3. Atualizar a tela
    atualizarTela();

    // 4. Limpar o formulário
    inputDescricao.value = '';
    inputValor.value = '';
    inputDescricao.focus();
});

// Função para atualizar o saldo e a lista no HTML
function atualizarTela() {
    // Usa a função do logic.js para calcular o novo saldo
    const saldoAtual = calcularSaldo(listaDeTransacoes);
    displaySaldo.textContent = `R$ ${saldoAtual.toFixed(2)}`;

    // Atualiza a cor do saldo (Verde se positivo, Vermelho se negativo)
    displaySaldo.style.color = saldoAtual >= 0 ? '#00796b' : '#f44336';

    // Limpa a lista no HTML e recria
    ulTransacoes.innerHTML = '';
    
    listaDeTransacoes.forEach(transacao => {
        const li = document.createElement('li');
        li.classList.add(transacao.tipo); // Adiciona classe 'entrada' ou 'saida' para o CSS
        li.innerHTML = `
            <span>${transacao.descricao}</span>
            <span>R$ ${transacao.valor.toFixed(2)}</span>
        `;
        ulTransacoes.appendChild(li);
    });
}