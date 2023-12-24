const express = require("express");
const { check } = require('express-validator');
const authController = require("../controller/AuthController.js")

const router = express.Router();

router.post('/registration', [
    check('username', 'The name cannot be empty').notEmpty(),
    check('password', 'password is no less than 4 and no more than 10').isLength({min: 4, max: 10})
] ,authController.registration);
router.post('/login',  [
    check('username', 'The name cannot be empty').notEmpty(),
    check('password', 'password is no less than 4 and no more than 10').isLength({min: 4, max: 10})
]  , authController.login);
router.get('/users', authController.getUsers);
router.put('/tests', authController.updateUser);

module.exports = router;