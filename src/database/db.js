const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'distribuidora.db');

class Database {
  constructor() {
    this.db = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Erro ao conectar no banco:', err.message);
          reject(err);
        } else {
          console.log('Banco SQLite conectado com sucesso!');
          this.db.run('PRAGMA foreign_keys = ON');
          resolve(this.db);
        }
      });
    });
  }

  getConnection() {
    if (!this.db) throw new Error('Banco não conectado');
    return this.db;
  }

  close() {
    return new Promise((resolve, reject) => {
      if (!this.db) return resolve();
      this.db.close((err) => {
        if (err) reject(err);
        else {
          console.log('Banco fechado com sucesso!');
          resolve();
        }
      });
    });
  }
}

module.exports = new Database();
