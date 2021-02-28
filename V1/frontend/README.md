# Sistema de Treinamento

Comandos de instalação descritos nesta documentação é compatível para Sistema Operacional Windows.

Comunicações importantes:
- Para o efetivo funcionamento do sistema como pré-requisito é necessário ter o NodeJs em sua máquina;
- Como banco de dados foi utilizado o postgres associado ao knex, utilizando a porta 3000 (verificar antes se a porta esta desocupada);
- A aplicação esta em duas pastas separadas denominadas: 1)Backend e 2)Front end;
- Como pré-requisito é preciso ter conhecimentos básicos de comandos em cmd(prompt de comando);
- Necessário ter o banco de dados postgres instalado em sua máquina com sua conta ativa. Além disso, conhecimentos básicos em comando do postgres é bem vindo, mas não completamente necessário.

Segue abaixo alguns passos importantes e necessários:

1. É necessário instalar o knex de forma global, para isso, acesse o cmd(prompt) de sua máquina e insira o comando: npm i -g knex

2. Será necessário criar um banco de dados pelo postgres. Para isso através do cmd(prompt de comando):
 a) acessar a pasta backend e digite: psql -U postgres. Logo em seguida ele solicitará sua senha, portanto, insira sua senha de utilização do banco de dados. (Essa senha normalmente é cadastrada quando da instalação do postgres em sua máquina).
 b) Tendo acessado o Banco de dados, insira o comando: create database partscatalog;.Esse comando irá criar um banco de dados para que os dados sejam persistidos em sua máquina.

3. Antes de acessar as aplicações, as dependências devem ser instaladas. Para isso, a) acessar a pasta Backend através do prompt e digitar: npm i. Após b) acessar a pasta Frontend, também através do cmd, e digitar: npm i

4. Comandos para rodar o sistema em Frontend. Através do cmd(prompt de comando) digite: npm run serve, acessando a porta 8080 (verificar antes se a porta esta desocupada). Caso a porta esteja ocupada será necessário liberá-la e repetir o processo anterior, ou inserir o comando em outra porta, como por exemplo a 8081 ou outra de sua preferência. Para a última opção pode-se substituir o comando acima por: npm run serve -- --port 8081. (ou outra numeração de porta de sua preferência).

5. Comandos para rodar o sistema em Backend. Através do cmd(prompt de comando) digite: npm start

6. Abrir o Browser e colocar o endereço de acordo com a porta escolhida no passo 4, caso tenha sido a porta 8080, por exemplo, insira o endereço http://localhost:8080, para acessar toda aplicação e utilizar o sistema.
