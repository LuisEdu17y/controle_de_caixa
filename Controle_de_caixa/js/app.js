// ==========================================
// VARIABLES GLOBALS
// ==========================================
let cotacoesAtuais = { USD: null, EUR: null, BTC: null };
let moedaAtiva = 'USD'; // Dòlar com a opció per defecte
let filtroAtual = 'todos';
let graficoInstancia = null;

// ==========================================
// INICIALITZACIÓ I ESDEVENIMENTS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicia la interfície i busca les cotitzacions
    atualizarInterface();
    exibirCotacoesNoCaixa();

    // 2. Esdeveniment per afegir una nova transacció
    const form = document.getElementById('form-transacao');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la pàgina es recarregui
        
        const desc = document.getElementById('descricao').value;
        const valor = document.getElementById('valor').value;
        const tipo = document.getElementById('tipo').value;

        // Validació bàsica
        if (desc.trim() === '' || isNaN(valor) || valor <= 0) {
            alert('Si us plau, introdueix una descripció vàlida i un valor més gran que zero.');
            return;
        }

        // Crida la lògica (logic.js)
        adicionarTransacaoLogic(desc, valor, tipo);
        
        // Actualitza la pantalla i neteja el formulari
        atualizarInterface();
        form.reset();
        document.getElementById('descricao').focus();
    });

    // 3. Esdeveniment del botó per actualitzar la cotització
    document.getElementById('btn-atualizar-cotacao').addEventListener('click', exibirCotacoesNoCaixa);

    // 4. Esdeveniment quan l'usuari canvia la moneda al menú desplegable
    document.getElementById('moeda-selecionada').addEventListener('change', (e) => {
        moedaAtiva = e.target.value;
        atualizarDisplayCambio();
        renderizarSaldo(); // Recalcula el saldo convertit a l'instant
    });
});

// ==========================================
// FUNCIONS D'ACTUALITZACIÓ DE LA INTERFÍCIE
// ==========================================
function atualizarInterface() {
    renderizarLista();
    renderizarSaldo();
    renderizarGrafico();
}

function renderizarSaldo() {
    const saldo = calcularSaldo(); // Ve de logic.js
    const saldoEl = document.getElementById('saldo-valor');
    const convertidoEl = document.getElementById('saldo-convertido');
    
    // Mostra el saldo en Reais (BRL)
    saldoEl.innerText = `R$ ${saldo.toFixed(2)}`;
    
    // Canvia el color (verd si és positiu, vermell si és negatiu)
    saldoEl.className = saldo >= 0 ? 'display-5 fw-bold text-success' : 'display-5 fw-bold text-danger';

    // Lògica de conversió segons la moneda activa
    if (cotacoesAtuais[moedaAtiva]) {
        const valorConvertido = saldo / cotacoesAtuais[moedaAtiva];
        
        let simbolo = '$';
        let casasDecimais = 2;

        if (moedaAtiva === 'EUR') simbolo = '€';
        if (moedaAtiva === 'BTC') {
            simbolo = '₿';
            casasDecimais = 6; // El Bitcoin necessita més decimals
        }

        convertidoEl.innerText = `${simbolo} ${valorConvertido.toFixed(casasDecimais)}`;
    } else {
        convertidoEl.innerText = "Calculant...";
    }
}

function renderizarLista() {
    const ul = document.getElementById('ul-transacoes');
    ul.innerHTML = '';
    
    let lista = obterTransacoes(); // Ve de logic.js
    
    // Aplica el filtre actual (Tots, Entrades o Sortides)
    if (filtroAtual !== 'todos') {
        lista = lista.filter(t => t.tipo === filtroAtual);
    }
    
    if (lista.length === 0) {
        ul.innerHTML = '<li class="list-group-item border-0 text-muted justify-content-center">Cap transacció...</li>';
        return;
    }

    lista.forEach(t => {
        const li = document.createElement('li');
        li.className = `list-group-item ${t.tipo}`;
        
        const sinal = t.tipo === 'entrada' ? '+' : '-';
        const corTexto = t.tipo === 'entrada' ? 'text-success' : 'text-danger';

        li.innerHTML = `
            <span>${t.descricao}</span>
            <div class="d-flex align-items-center gap-3">
                <span class="fw-bold ${corTexto}">
                    ${sinal} R$ ${t.valor.toFixed(2)}
                </span>
                <button class="btn btn-sm btn-outline-danger" onclick="remover(${t.id})" title="Eliminar">X</button>
            </div>`;
        ul.appendChild(li);
    });
}

function renderizarGrafico() {
    const t = obterTransacoes();
    const entradas = t.filter(x => x.tipo === 'entrada').reduce((a, b) => a + b.valor, 0);
    const saidas = t.filter(x => x.tipo === 'saida').reduce((a, b) => a + b.valor, 0);

    const ctx = document.getElementById('meuGrafico');
    
    // Si ja existeix un gràfic, el destruïm abans de dibuixar-ne un de nou
    if (graficoInstancia) graficoInstancia.destroy();
    
    // Si no hi ha dades, no dibuixa res
    if (entradas === 0 && saidas === 0) return;

    graficoInstancia = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entrades', 'Sortides'],
            datasets: [{
                data: [entradas, saidas],
                backgroundColor: ['#10b981', '#ef4444'], // Colors del Glassmorphism
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 2
            }]
        },
        options: { 
            responsive: true,
            plugins: { 
                legend: { 
                    position: 'bottom',
                    labels: { color: '#f8fafc' } 
                } 
            } 
        }
    });
}

// ==========================================
// FUNCIONS DE L'API I GLOBALS
// ==========================================
async function exibirCotacoesNoCaixa() {
    const display = document.getElementById('display-cotacao');
    const btn = document.getElementById('btn-atualizar-cotacao');
    
    display.innerText = "Buscant...";
    btn.disabled = true; // Desactiva el botó temporalment
    
    const valores = await buscarCotacoesMultiplas(); // Ve de logic.js
    
    if (valores) {
        cotacoesAtuais = valores; // Desa les cotaçons globalment
        atualizarDisplayCambio();
        renderizarSaldo();
    } else {
        display.innerText = "Error a l'API";
    }
    
    btn.disabled = false;
}

function atualizarDisplayCambio() {
    if (cotacoesAtuais[moedaAtiva]) {
        if (moedaAtiva === 'BTC') {
            document.getElementById('display-cotacao').innerText = `R$ ${cotacoesAtuais[moedaAtiva].toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        } else {
            document.getElementById('display-cotacao').innerText = `R$ ${cotacoesAtuais[moedaAtiva].toFixed(2)}`;
        }
    }
}

// Funcions globals cridades directament des de l'HTML (onclick)
window.remover = (id) => { 
    if(confirm("Estàs segur que vols eliminar aquesta transacció?")) {
        removerTransacaoLogic(id); 
        atualizarInterface(); 
    }
};

window.aplicarFiltro = (f) => { 
    filtroAtual = f; 
    // Canvia l'estat visual dels botons de filtre
    document.querySelectorAll('.btn-group .btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderizarLista(); 
};