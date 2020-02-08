// importing data base config
const db = require('../database/dbConfig.js');

// exporting methods
module.exports = {
  add,
  find,
  findBy,
  findById,
};

// find method implementation
function find() {
  return db('users').select('id', 'username');
}

// findBy method implementatio
function findBy(filter) {
  return db('users').where(filter);
}

// add method implementation
async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

// findById method implementation
function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
