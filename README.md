# api_aluno

## Como Rodar o Projeto

### Pré-requisitos
1. **Node.js**: Certifique-se de ter o Node.js instalado.
2. **MySQL**: Certifique-se de ter o MySQL instalado e rodando.

### Passo 1: Clonar o Repositório
Primeiro, clone o repositório do projeto para o seu computador:
```sh
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### Passo 2: Configurar Banco de Dados

O jeito correto está no arquivo .env
```sh
DATABASE_URL="mysql://<USUARIO>:<SENHA>@<HOST>:<PORTA>/alunoDB"
PORT=3000
```
### Passo 3: Instalar as dependências
Navegue até a pasta back e instale as dependências do projeto:
```sh
cd back
npm install
```
### Passo 4: Configurar o PriSe o migrate não estiver no diretório quando der o clone, executar:
```sh
npx prisma generate
npx prisma migrate dev
```

### Passo 5: Rodar o Servidor Backend
Inicie o servidor backend (O servidor estará rodando em http://localhost:3000):
```sh
npm run dev
```
### Passo 6: Rodar o Frontend
Abra o arquivo index.html na pasta front no seu navegador. Você pode fazer isso de várias maneiras:

Navegue até a pasta front e abra o arquivo index.html diretamente no navegador.
Use uma extensão do VS Code como "Live Server" para rodar o arquivo index.html.

http://127.0.0.1:5500/front/index.html