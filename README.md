# Teste de avaliação técnica para a empresa iCasei. 
Acesse o repositório da iCasei para ler os requisitos do teste: [Repositório iCasei](https://github.com/icasei/teste-front-end/blob/master/README.md).


### Design

- **Wireframe fornecido pela iCasei:** [Desktop](https://www.figma.com/proto/8PgmEzgqXUzLufhzExa6S3/teste-frontend?node-id=2%3A766&scaling=min-zoom&page-id=2%3A765&starting-point-node-id=2%3A766) - [Mobile](https://www.figma.com/proto/8PgmEzgqXUzLufhzExa6S3/teste-frontend?node-id=2%3A237&scaling=scale-down&page-id=0%3A1&starting-point-node-id=2%3A237)


- **Design criado por mim:** [Desktop](https://www.figma.com/proto/CTvXlBqW8zf9D0FsNqAaBD/iList?node-id=503%3A678&scaling=min-zoom&page-id=503%3A567&starting-point-node-id=503%3A634&hide-ui=1) - [Mobile](https://www.figma.com/proto/CTvXlBqW8zf9D0FsNqAaBD/iList?node-id=503%3A678&scaling=min-zoom&page-id=503%3A567&starting-point-node-id=503%3A634&hide-ui=1)



****


## DESENVOLVIMENTO

### Instalação

Instale e o docker compose:
- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Crie a chave de acesso a *API* do Youtube. ([link](https://developers.google.com/youtube/v3/getting-started?hl=pt-br)).

***
 Configure as variáveis de ambiente seguindo o exemplos `./api/env.sample` e `./webapp/env.sample`.
> 
*Ao final, você terá os seguintes arquivos:*
> - `./api/.env.development`  
> - `./api/.env.test`  
> - `./webapp/.env.development`  
> - `./webapp/.env.test`


***
Instale as dependências de cada projeto executando:
```bash
cd api && npm install && cd ../webapp && npm install && cd ..
```

***
Inicie a aplicação utilizando o docker compose. 

```bash

docker-compose up -d

```
*OBS: Utilize o seguinte comando para ver os logs: `docker-compose logs -f api` .*

***
Crie a estrututura do banco de dados e adicione um usuário de teste utilizando o comando de migration. 
```bash
cd api && npm run typeorm:migration:run:dev && cd ..

```

***

#### Acesse as aplicações:

 
> --
>
> ***WEBAPP***
> http://localhost:9090
>
> **Email**: teste@icasei.com.br
> **Senha**: mecontrata
> 
> --
>
> ***DOCUMENTAÇÃO (Storybook)***
> ```bash
> npm run storybook
> ```
>
> [http://localhost:6006](http://localhost:6006)
> 
> 
> 
> --
****
> --
> 
> ***API***
> [http://localhost:3000](http://localhost:3000)
>
> ***DOCUMENTAÇÃO (OpenAPI)***
> [http://localhost:3000/api](http://localhost:3000/api)
> 
> --
 ****

> --
>
> ***BANCO DE DADOS***
> [http://localhost:16544](http://localhost:16544)
>
> email: willychagasf@gmail.com
> password: dev
>
> Dados de acesso:
> host: postgres
> db: dev
> user: dev
> password: dev
> port: 5432
> 
> --
 


### Testes

***[API] Testes unitários***
```bash
cd ./api
npm run test
```

***[API] Teste e2e e Testes unitários***
```bash
cd ./api
npm run test:all
```

***[WEBAPP] Testes unitários***
```bash
cd ./webapp
npm run test
```

***[WEBAPP] Teste e2e***
```bash
cd ./WEBAPP
npm run test:e2e
```
