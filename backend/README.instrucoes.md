<!-- Colletions -->
- Criação da Colletion: 

Vai precisar apenas do nome da colletion, e ele criará o uuid.

rota : /colletion

----

- Editar Nome e Deletar Colletion: 

Necessario o id pela parametros da rota( totalmente mudavel, tenta fazer do jeito que vc conseguir ai e for melhor, vale pra todos os outros. )

rota : /colletion/:id

---

- Pegar todas as colletions, 
Pega todas as colletions criadas, para a listagem, da seguinte forma:

```bash
[
  {
    id: "68828882-7814-45ed-80be-ebb606b6dbc7",
    nome: "Colletion Faculdade"
  },
  {
    id: "",
    nome: ""
  }
]
```

rota: /colletion

---

<!-- Todos -->

- Criação de Todo

name,
complete,
description,
colletion

Esses são os campos necessarios á serem passados.

Onde 'Colletion' é o id da colletion em que essa todo está, facilitando em uma rota de listagem mais pra frente.

---

- Deletar a todo 

Assim como deletar a colletion, é apenas necessario o id da todo pelos parametros rota.

---

- Editar Todo

id(params),
name,
description,
complete

São os campos nescessarios para as mudança, o id sendo apenas p verificar se o todo existe. Apenas name, description e complete podem ser mudados.

---

- Listar Todos de um Colletion em Especifico

É preciso apenas o id da colletion que está na tela e listará seus todos. 


```bash
[
	{
		"id": "75893d89-8a21-4d73-96ef-cf2716c99bd0",
		"name": "Fazer comida amanha",
		"description": "Frango com Arroz",
		"complete": false,
		"colletion": "68828882-7814-45ed-80be-ebb606b6dbc7"
	}
]
```


<br></br>


Ai está o insomnia, onde estão todas as rotas.

<!-- Insomnia -->
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=todo-api&uri=)