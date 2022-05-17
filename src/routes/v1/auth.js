const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('../../middleware/validation');
const { userSchema } = require('../../models/auth');
const { mysqlConfig, jwtSecret } = require('../../config');

const router = express.Router();

router.post('/register', validation(userSchema), async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    const passHash = bcrypt.hashSync(req.body.password, 10);
    const [data] = await con.execute(
      `INSERT INTO users (email, password)
            VALUES (${mysql.escape(req.body.email)}, '${passHash}')
            `
    );
    await con.end();
    if (!data.insertId) {
      return res.status(500).send({ error: 'Server issue. Please try again.' });
    }
    console.log(req.body);
    return res.send({ msg: 'Registration successful', userId: data.insertId });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server issue. Please try again.' });
  }
});

module.exports = router;
