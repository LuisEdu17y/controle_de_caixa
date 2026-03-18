#  Controle de Caixa

[![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](#)
[![CI Status](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions)](#)
[![Jest](https://img.shields.io/badge/Testes-Jest-C21325?logo=jest)](#)
[![ESLint](https://img.shields.io/badge/Lint-ESLint-4B32C3?logo=eslint)](#)

Um aplicativo web simples e eficiente para gerenciamento financeiro pessoal. Este projeto foi desenvolvido como parte de um desafio de Bootcamp, com foco não apenas na interface, mas na aplicação de boas práticas de engenharia de software, incluindo **Testes Automatizados**, **Análise Estática de Código** e **Integração/Entrega Contínua (CI/CD)**.

 **Acesse a aplicação online aqui:** [Controle de Caixa no Vercel](https://controle-de-caixa-livid.vercel.app/)

---

##  Funcionalidades

- **Registro de Transações:** Adicione entradas e saídas financeiras com descrição e valor.
- **Cálculo Automático:** O saldo total é recalculado automaticamente a cada nova transação.
- **Feedback Visual:** O saldo fica verde quando positivo e vermelho quando negativo.
- **Qualidade Garantida:** Lógica de negócios coberta por testes unitários.

##  Tecnologias e Ferramentas

**Front-end:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Qualidade e Automação:**
- **[Jest](https://jestjs.io/pt-BR/):** Framework utilizado para testes unitários da lógica de cálculo.
- **[ESLint](https://eslint.org/):** Ferramenta de análise estática para garantir o padrão e a qualidade do código JavaScript.
- **[GitHub Actions](https://github.com/features/actions):** Pipeline de CI (Continuous Integration) configurada para rodar testes e linting automaticamente a cada *push*.
- **[Vercel](https://vercel.com/):** Plataforma de CD (Continuous Deployment) para hospedagem da aplicação.

---

##  Como rodar este projeto localmente

Se você quiser baixar e testar este projeto na sua própria máquina, siga os passos abaixo:

### Pré-requisitos
Você precisará ter o [Node.js](https://nodejs.org/) e o [Git](https://git-scm.com/) instalados no seu computador.

### Passo a passo

1. Clone este repositório:
```bash
git clone [https://github.com/LuisEdu17y/controle_de_caixa.git](https://github.com/LuisEdu17y/controle_de_caixa.git)