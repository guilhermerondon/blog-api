# Blog API

## Descrição

A Blog API é uma aplicação backend desenvolvida em TypeScript utilizando Express e TypeORM. Ela permite a criação, leitura, atualização e exclusão (CRUD) de posts de blog, além de gerenciar comentários.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **TypeORM**
- **PostgreSQL/MySQL** (dependendo do seu banco de dados)
- **Express Validator** para validação de dados

## Funcionalidades

- **GET /posts**: Retorna uma lista de todos os posts.
- **POST /posts**: Cria um novo post.
- **PUT /posts/:id**: Atualiza um post existente.
- **DELETE /posts/:id**: Deleta um post.
- **GET /posts/:id**: Retorna um post específico.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
Instale as dependências:

bash
Copiar código
npm install
Configure seu banco de dados no arquivo de configuração (exemplo: ormconfig.json ou similar).

Execute a aplicação:

bash
Copiar código
npm start
Acesse a API em http://localhost:3000.

Uso com Postman
Para listar todos os posts, faça um GET em http://localhost:3000/posts.

Para criar um novo post, faça um POST em http://localhost:3000/posts com o seguinte corpo JSON:

json
Copiar código
{
  "title": "Título do Post",
  "content": "Conteúdo do Post"
}
Para atualizar um post, faça um PUT em http://localhost:3000/posts/:id com o corpo JSON correspondente.

Para deletar um post, faça um DELETE em http://localhost:3000/posts/:id.

Contribuição
Sinta-se à vontade para contribuir com melhorias, correções de bugs e novas funcionalidades. Abra um pull request ou crie uma issue para discutir mudanças.

Licença
Este projeto está licenciado sob a MIT License.

arduino
Copiar código

Sinta-se à vontade para personalizar o conteúdo conforme necessário!
