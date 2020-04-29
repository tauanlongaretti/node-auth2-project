const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const secrets = require('../config/secrets.js')

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved)
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch((err) => {
      res.status(500).json({ message: "problems with the db", error: err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}`, jwt_token: token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with the db", error: err });
    });
});

router.get("/logout", (req, res) => {
    
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: ['Tech']
        // other data
    };

    const options = {
        expiresIn: '30 min'
    };

    const token = jwt.sign(payload, secrets.jwt_secret, options);

    return token
}

module.exports = router;
