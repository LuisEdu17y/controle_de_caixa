#  Controle de Caixa Pro — Dashboard Financeiro

[![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](#)
[![CI Status](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions)](#)
[![Jest](https://img.shields.io/badge/Testes-Jest-C21325?logo=jest)](#)
[![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint)](#)

O **Controle de Caixa Pro** é uma aplicação de gestão financeira pessoal que evoluiu de um simples rastreador para um dashboard completo. Com uma interface moderna baseada em **Glassmorphism**, o sistema oferece visão analítica de gastos, conversão de moedas em tempo real e gráficos interativos.

---

## ✨ Funcionalidades Principais

-   **Dashboard Visual:** Gráfico de rosca dinâmico (Chart.js) que mostra a proporção entre Entradas e Saídas.
-   **Câmbio Multi-Moedas:** Integração com API externa para converter seu saldo instantaneamente para **Dólar (USD)**, **Euro (EUR)** ou **Bitcoin (BTC)**.
-   **Design Premium (Glassmorphism):** Interface translúcida com efeitos de desfoque e gradientes neon para uma experiência de usuário moderna.
-   **Filtros de Histórico:** Organize sua visualização filtrando por "Apenas Entradas", "Apenas Saídas" ou "Ver Tudo".
-   **Persistência de Dados:** Suas transações ficam salvas no `localStorage` do navegador, não se perdem ao atualizar a página.
-   **Cálculo Automático:** Saldo atualizado em tempo real com feedback visual (Verde para positivo, Vermelho para negativo).

---

## 🛠️ Tecnologias e Ferramentas

**Front-end & Design:**
-   **HTML5 & CSS3 Avançado:** Uso de variáveis CSS, Glassmorphism e gradientes.
-   **Bootstrap 5:** Estrutura responsiva.
-   **Chart.js:** Renderização de gráficos interativos.
-   **JavaScript (ES6+):** Manipulação de DOM, estados e lógica de conversão.

**Integrações:**
-   **[AwesomeAPI](https://docs.awesomeapi.com.br/):** Consumo de cotações de moedas em tempo real.

**Qualidade & CI/CD:**
-   **Jest:** Testes unitários para garantir que a lógica de cálculo nunca falhe.
-   **ESLint:** Padronização de código.
-   **GitHub Actions:** Pipeline de automação para testes a cada commit.

---

## 🚀 Como Executar o Projeto

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  Abra o arquivo `index.html` diretamente no seu navegador ou utilize a extensão **Live Server** do VS Code.
3.  Para rodar os testes de lógica:
    ```bash
    npm install
    npm test
    ```

---

## 📸 Preview da Interface

> [!TIP]
><img width="1908" height="871" alt="image" src="https://github.com/user-attachments/assets/3426a4e7-7b54-4ce6-b0ff-09390517f72f" />


---

## 📝 Estrutura do Projeto

-   `index.html`: Estrutura da página e containers do dashboard.
-   `style.css`: Estilização premium e efeitos de vidro.
-   `js/logic.js`: Núcleo de processamento de dados e chamadas de API.
-   `js/app.js`: Controlador da interface, eventos e renderização de gráficos.
-   `__tests__/`: Pasta contendo os testes unitários da aplicação.

---

Desenvolvido como parte de um desafio de Bootcamp focado em Engenharia de Software.
