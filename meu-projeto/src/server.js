import express from "express";
import { tarefas } from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

// rota inicial simples
app.get("/", (req, res) => {
    res.send(
        `<h1>API de Tarefas</h1>
        <p>Acesse <a href="/tarefas">/tarefas</a> para ver a lista em JSON.</p>`
    );
});

// listar todas as tarefas
app.get("/tarefas", (req, res) => {
    res.status(200).json(tarefas);
});

// ver uma tarefa específica
app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
    }
    res.json(tarefa);
});

// criar tarefa
app.post("/tarefas", (req, res) => {
    const { titulo } = req.body;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: "Título é obrigatório." });
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// alterar (marcar concluída)
app.patch("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
    }
    tarefa.concluida = !tarefa.concluida;
    res.json(tarefa);
});

// middleware 404 para outras rotas
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
