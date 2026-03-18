// Importa a nossa função matemática lá do arquivo logic.js
const { calcularSaldo } = require('../js/logic.js');

describe('Testes da função calcularSaldo', () => {
    
    // Teste 1: Caminho feliz (Mais entradas do que saídas)
    test('Deve calcular o saldo positivo corretamente', () => {
        const transacoes = [
            { tipo: 'entrada', valor: 100 },
            { tipo: 'saida', valor: 30 },
            { tipo: 'entrada', valor: 50 }
        ];
        // 100 - 30 + 50 = 120
        expect(calcularSaldo(transacoes)).toBe(120);
    });

    // Teste 2: Comportamento/Variação (Mais saídas do que entradas, gerando saldo negativo)
    test('Deve calcular o saldo negativo corretamente', () => {
        const transacoes = [
            { tipo: 'entrada', valor: 50 },
            { tipo: 'saida', valor: 100 }
        ];
        // 50 - 100 = -50
        expect(calcularSaldo(transacoes)).toBe(-50);
    });

    // Teste 3: Caso limite (Lista vazia sem nenhuma transação)
    test('Deve retornar saldo 0 se não houver transações', () => {
        const transacoes = [];
        expect(calcularSaldo(transacoes)).toBe(0);
    });

    // Teste 4: Ignorar tipos desconhecidos (Comportamento indevido)
    test('Deve ignorar transações com tipos inválidos', () => {
        const transacoes = [
            { tipo: 'entrada', valor: 50 },
            { tipo: 'desconhecido', valor: 100 }, // Não deve afetar a conta
            { tipo: 'saida', valor: 10 }
        ];
        // 50 - 10 = 40
        expect(calcularSaldo(transacoes)).toBe(40);
    });
});