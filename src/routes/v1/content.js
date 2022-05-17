const express = require('express');
const mysql = require('mysql2/promise');
const isLoggedIn = require('../../middleware/auth');
const { mysqlConfig } = require('../../config');

const router = express.Router();

router.post('/tasks', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(
      `INSERT INTO tasks (description) VALUES (${mysql.escape(
        req.body.description
      )})`
    );
    await con.end();
    return res.send({ msg: 'New item added' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server issue. Please try again.' });
  }
});

router.get('/tasks', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(`SELECT * FROM tasks`);
    await con.end();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server issue. Please try again.' });
  }
});

module.exports = router;
