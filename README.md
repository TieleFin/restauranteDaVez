# Restaurante da vez 🍽️

O desafio consiste em desenvolver um sistema destinado a simplificar a seleção do restaurante para o almoço dos funcionários de uma empresa. Diariamente, os colaboradores têm a oportunidade de votar em seu restaurante preferido para o almoço, sendo permitido apenas um voto por pessoa. Para garantir variedade, não é permitido escolher o mesmo restaurante mais de uma vez na mesma semana.

![enter image description here](https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

Nesse projeto foi desenvolvido a API REST para o Restaurante da Vez. Para isso foi utilizado:

- VS Code
- Node.js
- Insomnia
- Beekeeper 
- ElephantSQL

### Utilização

```bash
// CLONE ESSE REPOSITÓRIO:

-> git clone git@github.com:TieleFin/restauranteDaVez.git


// INSTALE AS DEPENDÊNCIAS:

->  npm install


// INICIE O SERVIDOR:

-> npm run dev


// Configure seu Beekeeper

-> Insira os dados conforme arquivo '.env'


// Configure seu Insomnia

```

## Documentação da API

### CADASTRO DE USUÁRIO

Cria um novo usuário com base nos dados recebidos no body da requisição e retorna as informações do usuário, acrescentando o `id` cadastrado e excluindo a `senha`.

    POST /usuario


##### Endpoint:

http://localhost:3000/usuario

##### Corpo da Requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do usuario |
| `email` | `string`| Responsável por armazenar o e-mail do usuario |
| `senha` | `string`| Responsável por armazenar a senha do usuario |

---
##### Exemplo Corpo da Requisição:

```javascript
{
	"nome": "Maria",
	"email": "maria@email.com",
	"senha": "12345"
}
```

##### Exemplo de Retorno:

```javascript
{
    "id": 1,
	"nome": "Maria",
	"email": "maria@email.com"
}
```

### LOGIN DE USUÁRIO

Permite que o usuário cadastrado realize login no sistema. Retorna as informações do usuário acrescentando o token de autenticação.

    POST /login

##### Endpoint:

http://localhost:3000/login

##### Corpo da Requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
|  `email` | `string`| Responsável por armazenar o e-mail do usuario |
|  `senha` | `string`| Responsável por armazenar a senha do usuario |

---

##### Exemplo Corpo da Requisição:

```javascript
{
	"email": "usuario@email.com",
	"senha": "12345"
}
```

##### Exemplo de Retorno:

```javascript
{
	"user": {
		"id": 1,
		"nome": "usuario",
		"email": "usuario@email.com"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNDQ3Nzg1LCJleHAiOjE3MTI0NzY1ODV9.JNV7GSX7_pbVYMdHmL0FnY3FTE1pmTqxZZ7ldOIHxYA"
}
```


### LISTAGEM DOS RESTAURANTES

Retorna a listagem com todos os restaurantes cadastrados.

    GET /restaurantes

##### Endpoint:

http://localhost:3000/restaurantes


---


##### Exemplo de Retorno:

```javascript
[
	{
		"id": 1,
		"nome": "Boa Comida",
		"cep": "95070990",
		"rua": "Vinte de Setembro",
		"numero": "500",
		"bairro": "Centro",
		"cidade": "Caxias do Sul",
		"estado": "RS"
	},
	{
		"id": 2,
		"nome": "Sushi Maravilha",
		"cep": "95070990",
		"rua": "Julio de Castilhos",
		"numero": "1000",
		"bairro": "Centro",
		"cidade": "Caxias do Sul",
		"estado": "RS"
	}
]
```

### **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. 


### DETALHAMENTO DO USUÁRIO

Retorna os dados do usuário logado de acordo com o `id`recebido como parâmetro de requisição

    GET /usuario/:id

##### Endpoint:

http://localhost:3000/usuario/3


---
##### Exemplo de Retorno:

```javascript
{
	"id": 3,
	"nome": "Tiago",
	"email": "tiago@email.com"
}
```

### CADASTRO DE RESTAURANTES

Cadastra um novo restaurante com base nos dados recebidos no body da requisição e retorna as informações do restaurante, acrescentando o `id` cadastrado.

    POST /restaurantes


##### Endpoint:

http://localhost:3000/restaurantes

##### Corpo da Requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `nome`  | `string` | Responsável por armazenar o nome do restaurante |
| `cep` | `number`| Responsável por armazenar CEP do restaurante |
| `rua` | `string`| Responsável por armazenar a rua do restaurante |
| `numero` | `number`| Responsável por armazenar o número do restaurante |
| `bairro` | `string`| Responsável por armazenar o bairro do restaurante |
| `cidade` | `string`| Responsável por armazenar a cidade do restaurante |
| `estado` | `string`| Responsável por armazenar o estado do restaurante |

---

##### Exemplo Corpo da Requisição:

```javascript
{
	"nome": "Fondue Bom Demais",
	"cep": "90000990",
	"rua": "Brasil",
	"numero": "500",
	"bairro": "Centro",
	"cidade": "Caxias do Sul",
	"estado": "RS"
}
```

##### Exemplo de Retorno:

```javascript
{
	"id": 5,
	"nome": "Fondue Bom Demais",
	"cep": "90000990",
	"rua": "Brasil",
	"numero": "500",
	"bairro": "Centro",
	"cidade": "Caxias do Sul",
	"estado": "RS"
}
```

### REALIZAR VOTO

Permite que o usuário possa votar no restaurante que deseja almoçar naquele dia. Receberá o id do restaurante votado no corpo da requisição e o id do usuário responsável pelo voto como parâmetro da requisição

    POST /votacao/7


##### Endpoint:

http://localhost:3000/votacao/7

##### Corpo da Requisição:

| Parâmetro | Tipo | Descrição|
| ------------ | ------------------------- |------------ |
| `idRestaurant`  | `number` | Responsável por armazenar o id do restaurante |

---

##### Exemplo Corpo da Requisição:

```javascript
{
	"idRestaurant": 4
}
```
##### Exemplo de Retorno:

```javascript
{
	"mensagem": "Voto realizado com sucesso"
}
```

### VERIFICAR RESULTADO DA VOTAÇÃO

Permite que os usuários possam acessar qual foi o resultado da votação. Em caso de empate o sistema retornará os restaurantes que obtiveram mais votos.

        GET /resultadovotacao


##### Endpoint:

http://localhost:3000//resultadovotacao


##### Exemplo de Retorno:

```javascript
{
	"mensagem": "Empate nos votos entre vários restaurantes mais votados",
	"restaurantes_empatados": [
		{
			"restaurante_id": 1,
			"total_votes": "3"
		},
		{
			"restaurante_id": 3,
			"total_votes": "3"
		}
	]
}
```
