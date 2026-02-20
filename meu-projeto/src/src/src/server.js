import express from "express"; [cite: 32, 41]
import { tarefas } from "./dados.js"; [cite: 33]

const app = express(); [cite: 42]
app.use(express.json()); [cite: 45]

// Listar tarefas - GET [cite: 47]
app.get("/tarefas", (req, res) => {
    res.status(200).json(tarefas); [cite: 54, 62]
});

// Criar tarefa - POST [cite: 48]
app.post("/tarefas", (req, res) => {
    const { titulo } = req.body; [cite: 50, 66]

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ erro: "Título é obrigatório." }); [cite: 56, 85, 86]
    }

    const novaTarefa = { id: tarefas.length + 1, titulo, concluida: false }; [cite: 74, 80]
    tarefas.push(novaTarefa);

    res.status(201).json(novaTarefa); [cite: 55, 68]
});

app.listen(3000, () => console.log("Servidor ON em http://localhost:3000")); [cite: 43]