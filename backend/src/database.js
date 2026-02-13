const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT DEFAULT 'Aberto',
      prioridade TEXT,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
