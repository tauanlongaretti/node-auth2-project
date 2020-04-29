const router = require('express').Router();
const checkDepartment = require('../auth/check-department-middleware.js');

const Users = require('./users-model.js');

const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkDepartment('Tech'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        })
});

module.exports = router;