const express = require('express')
const app = express()
require('dotenv').config()
const knex = require('./model/knex')
const port = 3000

app.use(express.json())

// console.log(process.env.PG)

app.get('/', async (req, res) => {
  const data = await knex('html').select('*')
  res.send(data);
})

app.get("/:id", async (req, res) => {
  const data = await knex('html').select('*').where('id', req.params.id);
  res.json(data);
});

app.post("/", async (req, res) => {
  const data = await knex('html').insert({code: req.body});
  res.json(data);
});

app.patch("/:id", async (req, res) => {
  const data = await knex('html').where({ id: req.params.id }).update('code', req.body);
  res.json(data);
})

app.delete("/:id", async (req, res) => {
  const data = await knex('html').where({ id: req.params.id }).del();
  res.json(data);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
