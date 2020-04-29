const db = require("../data/dbConfig.js");

function find() {
  return db("users").select("id", "username");
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where({ id }).first();
}

module.exports = {
  find,
  add,
  findBy,
  findById,
};
