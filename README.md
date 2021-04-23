# Api Rest de Usuários com Knex e JWT | Formação Node

API de CRUD completo | Tentando documentar 😎

## 📕 Sumário
1. [O que eu aprendi de novo nesse projeto](https://github.com/GustavoGomesDias/proj5#1--o-que-eu-aprendi-de-novo-nesse-projeto)
2. [Tecnologias usadas](https://github.com/GustavoGomesDias/proj5#2--tecnologias-usadas)
3. [Para rodar](https://github.com/GustavoGomesDias/proj5#3--para-rodar-o-projeto)
5. [Importante](https://github.com/GustavoGomesDias/proj5#5--importante)

## 1. 🎓 O que eu aprendi de novo nesse projeto
* Voltei a ver autenticação;
* Trabalho com classes;
* Knex - SQL;
* Gerenciamento de tipo de usuário (comum ou admin) com jwt;
* Recuperação de senha;
* Documentar uma API;
* Hash de senha;
* Intro. a cors

## 2. 💻 Tecnologias usadas
* Bcrypt;
* Cors;
* Express
* JWT;
* Knex;
  * Mysql2.
*Uuid.


## 3. 🎉 Para rodar o projeto
1. Instale todas es tec's usadas junto do Node JS:

    ```
    npm install
    ```
2. Rode o aplicativo

    ```
    npm run dev
    ```
3. Você precisará de uma ferramente de teste de requisições como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
4. Digite localhost:8686 e siga a minha tentativa de documentação para usar a api

## 4. 📖 Documentação

### GET
#### /
Descrição   | Valor
--------- | ------
Autenticação | Não requerido
Parâmetros | Não requerido
Status code | 200 (OK) ou 404 (Not Found)

#### /user
Descrição   | Valor
--------- | ------
Autenticação | Requerida
Parâmetros | Não requerido
Status code | 200 (OK) ou 404 (Not Found)


#### /user/:id
Descrição   | Valor
--------- | ------
Autenticação | Requerida
Parâmetros | Id de um usuário
Status code | 200 (OK) ou 404 (Not Found)

### POST
#### /user
Descrição   | Valor
--------- | ------
Autenticação | Não requerida
Parâmetros | Não requerido
Formato do response | JSON
Informações passadas no body | Nome, Email e Senha
Status code | 200 (OK) ou 404 (Not Found)

#### /login
Descrição   | Valor
--------- | ------
Autenticação | Não requerida
Parâmetros | Não requerido
Formato do response | JSON
Informações passadas no body | Email e Senha
Resposta enviada | Token de autenticação
Status code | 200 (OK), 400 (Bad request) ou 406 (Not Acceptable)

#### /recoverypassword
Descrição   | Valor
--------- | ------
Autenticação | Não requerida
Parâmetros | Não requerido
Formato do response | JSON
Informações passadas no body | Email
Resposta enviada | Token para mudança da senha
Status code | 200 (OK) ou 406 (Not Acceptable)

#### /changepassword
Descrição   | Valor
--------- | ------
Autenticação | Não requerida
Parâmetros | Não requerido
Formato do response | JSON
Informações passadas no body | Token e nova senha
Status code | 200 (OK) ou 406 (Not Acceptable)

### PUT
#### /user
Descrição   | Valor
--------- | ------
Autenticação | Requerida
Parâmetros | Não requerido
Formato do response | JSON
Informações passadas no body | Id, novo email e/ou novo nome
Status code | 200 (OK) ou 406 (Not Acceptable)

### DELETE
#### /user/:id
Descrição   | Valor
--------- | ------
Autenticação | Requerida
Parâmetros |  Requerido
Parâmetro | Id do usuário
Formato do response | JSON
Status code | 200 (OK) ou 406 (Not Acceptable)

## 5. 👀 Importante
Nos [Commits](https://github.com/GustavoGomesDias/guiapress/commits?author=GustavoGomesDias) tem comentários das mudanças para estudos e referências futuras, se você está de passagem e estudando sobre nodejs, fique avontade para estudar comigo por lá. 😉


Criado durante o curso [Formação NodeJS](https://www.udemy.com/course/formacao-nodejs/).

[Gustavo ❤](htpps://www.github.com/GustavoGomesDias)
