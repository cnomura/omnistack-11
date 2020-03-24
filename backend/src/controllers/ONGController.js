const connection = require('../database/connection');
const crypto = require('crypto');

const currentTable = 'ongs';

module.exports = {
  async index (req, res) {
    const [count] = await connection(currentTable).count();
    const ongs = await connection(currentTable).select('*');

    return res.json(ongs);
  },
  async create (req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection(currentTable).insert({ id, name, email, whatsapp, city, uf });

    return res.json({ id });
  }
};