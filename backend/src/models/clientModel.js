const db = require("../database");

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf_cnpj TEXT NOT NULL,
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT,
    email TEXT,
    telefone TEXT
  )
`);

// Criar cliente
function createClient(client, callback) {
  const { cpf_cnpj, razao_social, nome_fantasia, email, telefone } = client;

  const sql = `
    INSERT INTO clients (cpf_cnpj, razao_social, nome_fantasia, email, telefone)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [cpf_cnpj, razao_social, nome_fantasia, email, telefone], function (err) {
     if (err) {
     return callback(err);
      }
      callback(null, this.lastID);
  });
}

// Buscar todos
function getClients(callback) {
  db.all("SELECT * FROM clients", [], callback);
}

// Buscar por ID
function getClientById(id, callback) {
  db.get("SELECT * FROM clients WHERE id = ?", [id], callback);
}

// Atualizar
function updateClient(id, client, callback) {
  const { cpf_cnpj, razao_social, nome_fantasia, email, telefone } = client;

  const sql = `
    UPDATE clients
    SET cpf_cnpj = ?, razao_social = ?, nome_fantasia = ?, email = ?, telefone = ?
    WHERE id = ?
  `;

  db.run(sql, [cpf_cnpj, razao_social, nome_fantasia, email, telefone, id], callback);
}

// Deletar
function deleteClient(id, callback) {
  db.run("DELETE FROM clients WHERE id = ?", [id], callback);
}

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
