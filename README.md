<div align="center">

# MK CODE CHALLENGE - Candidato à vaga de Dev Back End

> Desenvolver um conjunto de APIs para um sistema de vendas de uma loja.

</div>

<br>

<h1 align="center">
    <img alt="Mk-Solutions" title="Mk-Solutions" src=".github/MK-SOLUTIONS.png" width="750px"/>
</h1>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rodando-o-projeto">Rodando o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

</p>

<br>

## 👨🏻‍💻 Sobre O projeto

Desenvolver um conjunto de APIs para um sistema de vendas de uma loja. Não há
restrição quanto ao número de funcionalidades, porém, espera-se que os componentes
abaixo sejam implementados...

## 🚀 Tecnologias:

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [JSON Web Token](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://jestjs.io/)
- [Docker e Docker-compose](https://docs.docker.com/)

## 💻 Rodando o projeto:

1 - Clone o projeto e o abra utilizando seu editor preferido.

2 - Rode `npm install` na pasta do projeto para instalar dependências.

3 - Copiar e configurar o arquivo .env `cp .env.model .env`.

4 - Rode um `docker-compose up -d` para rodar o projeto.

5 - Rode as migrations com `npx prisma generate`.

6 - Rode `npx prisma migrate dev` e `npx prisma migrate reset` para dar um seed no database.

7 - Você vai precisar logar o usuário para acessar as rotas com um Token: `"email: 'vendedor@email.com', password: 'saller',"`

## 👨‍🏫 Como contribuir:

- Faça um fork do projeto;
- Crie uma nova branch, exemplo: `git checkout -b my-feature`;
- Commit as modificações, exemplo: `git commit -m 'feat: My new feature'`;
- Faça um push para a sua branch: `git push origin my-feature`;

Desenvolvido por 🧗‍♂️&nbsp; Manfrinne Ferreira 🔥 [Contato](https://www.linkedin.com/in/manfrinne-ferreira-6033121a7/) - Code Challenge Mk Solutions 🔥
