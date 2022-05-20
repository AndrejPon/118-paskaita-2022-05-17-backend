const express = require('express');
const mysql = require('mysql2/promise');
const isLoggedIn = require('../../middleware/auth');
const { mysqlConfig } = require('../../config');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(
      `INSERT INTO tasks (user_id, description) 
      VALUES (${mysql.escape(req.body.user_id)}, ${mysql.escape(
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

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const [data] = await con.execute(
      `SELECT id, description AS task FROM tasks
      WHERE user_id = (${mysql.escape(req.user.id)})
      `
    );
    await con.end();
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server issue. Please try again.' });
  }
});

module.exports = router;
