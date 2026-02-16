const express = require("express");
const db = require("./database");
const clientModel = require("./models/clientModel");


const router = express.Router();

// Criar chamado
router.post("/tickets", (req, res) => {
  const { titulo, descricao, prioridade, status, cliente_id } = req.body;

  db.run(
    `INSERT INTO tickets (titulo, descricao, prioridade, status, cliente_id) 
     VALUES (?, ?, ?, ?, ?)`,
    [titulo, descricao, prioridade, status || "Aberto", cliente_id],
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

// Criar cliente
/*router.post("/clients", (req, res) => {
  clientModel.createClient(req.body, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Cliente criado", id });
  });
});*/
router.post("/clients", (req, res) => {
  console.log("BODY:", req.body);

  clientModel.createClient(req.body, (err, id) => {
    if (err) {
      console.log("ERRO SQLITE:", err);
      return res.status(500).json({ error: err.message });
    }

    console.log("CLIENTE CRIADO ID:", id);
    res.json({ message: "Cliente criado", id });
  });
});


// Listar clientes
router.get("/clients", (req, res) => {
  clientModel.getClients((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Buscar por ID
router.get("/clients/:id", (req, res) => {
  clientModel.getClientById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Atualizar cliente
router.put("/clients/:id", (req, res) => {
  clientModel.updateClient(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Cliente atualizado" });
  });
});

// Deletar cliente
router.delete("/clients/:id", (req, res) => {
  clientModel.deleteClient(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Cliente deletado" });
  });
});

// Adicionar mensagem ao ticket
router.post("/tickets/:id/messages", (req, res) => {
  const { id } = req.params;
  const { mensagem, autor } = req.body;

  db.run(
    `INSERT INTO ticket_messages (ticket_id, mensagem, autor)
     VALUES (?, ?, ?)`,
    [id, mensagem, autor || "Técnico"],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({ message: "Mensagem adicionada" });
    }
  );
});

// Busca de msgs
router.get("/tickets/:id/messages", (req, res) => {
  db.all(
    `SELECT * FROM ticket_messages WHERE ticket_id = ? ORDER BY data ASC`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

//Finalizar ticket concluido
router.put("/tickets/:id/finalizar", (req, res) => {
  db.run(
    `UPDATE tickets SET status = 'Concluído' WHERE id = ?`,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Ticket finalizado com sucesso" });
    }
  );
});







module.exports = router;
