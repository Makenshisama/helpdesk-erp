const express = require("express");
const db = require("./database");

const router = express.Router();

// Criar chamado
router.post("/tickets", (req, res) => {
  const { titulo, descricao, prioridade, status } = req.body;

  db.run(
    `INSERT INTO tickets (titulo, descricao, prioridade, status) 
     VALUES (?, ?, ?, ?)`,
    [titulo, descricao, prioridade, status || "Aberto"],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Listar chamados
router.get("/tickets", (req, res) => {
  db.all(`SELECT * FROM tickets`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Atualizar chamado
router.put("/tickets/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, prioridade } = req.body;

  db.run(
    `UPDATE tickets 
     SET titulo = ?, 
         descricao = ?, 
         status = ?, 
         prioridade = ?
     WHERE id = ?`,
    [titulo, descricao, status, prioridade, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Chamado não encontrado" });
      }

      res.json({ message: "Chamado atualizado com sucesso" });
    }
  );
});

// Deletar chamado
router.delete("/tickets/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM tickets WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Chamado não encontrado" });
      }

      res.json({ message: "Chamado deletado com sucesso" });
    }
  );
});



module.exports = router;
