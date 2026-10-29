# AGENTS.md

## Visão geral

Este projeto é um site para fins educacionais, focando no meu aprendizado, ele consiste em uma aplicação web que possui telas para o usuário e um servidor rodando por trás para processar as informações. O sistema permite que o usuário se cadastre, faça login, acesse uma página de perfil, responda a um formulário e veja gráficos dinâmicos de dados. A ideia é conectar um front-end a um back-end funcional que salva tudo no banco de dados. O intuito do site é ser um local em que o usuário faz um cadastro, e adiciona músicas que deseja aprender, e em qual instrumento deseja aprender, e pode acompanhar seu progresso de aprendizado na dashboard.

## Tecnologias

* **Front-end:** HTML, CSS e JavaScript, com ChartJS para criação de gráficos.
* **Back-end:** Node.js para construção de API.
* **Banco de Dados:** MySQL.

## Comandos

Instalar dependencias: npm install
Iniciar o projeto: npm start
Interromper a execução: ctrl + c

## Arquitetura
## Estrutura das principais pastas:
* **Front-end (Pasta `public/`):** Contém os arquivos da interface gráfica (`.html`, `.css`, `.js`). É a camada visual do site, separada por páginas html, assets de imagens, arquivos css e features da dashboard.
## Fluxo de uma requisição:
* **Rotas (Pasta `src/routes/`):** Pega as requisições do front-end e encaminha para o controlador responsável.
* **Controller / Controlador (Pasta `src/controllers/`):** Recebe o aviso da rota, aplica as regras do sistema (ex: validação se os campos do formulário estão preenchidos) e envia para o Model. 
* **Model / Modelo (Pasta `src/models/`):** Se conecta com o banco de dados e executa os comandos SQL (inserir usuário, buscar login, etc.).

## Padrões de desenvolvimento

* **Padrão de nomenclatura para nomes de arquivo, funções e variáveis:**
- Nomes de arquivo sempre com o título da página, ex: cadastro.html
- Sempre com snake case para váriaveis de input, e cammel case para nomes compostos: ex: ipt_login, ipt_senha, ipt_confirmarSenha

## Cuidados e restrições

- Seguir sempre o padrão e lógica de arquivos já criados, sem utilizar funções e comandos avançados que não foram usados anteriormente.
- Não refatorar completamente o código já pré-estabelecido, e não alterar completamente a lógica de funcionamento apenas por ser o "padrão de mercado"


## Regra geral: 
Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.
