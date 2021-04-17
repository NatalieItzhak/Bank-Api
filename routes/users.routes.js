const express = require('express');
const router = express.Router();
const controlRoutes = require('../controllers/users.controllers')

router
    .get('/', (req, res) => {
        controlRoutes.getAllUsers(req, res);
    }).get('/:passportId', (req, res) => {
        controlRoutes.getUserById(req, res);
    }).post('/', (req, res) => {
        controlRoutes.addNewUser(req, res);
    }).put('credit/:passportId', (req, res) => {
        controlRoutes.updateUserCredit(req, res);
    }).delete('/:passportId', (req, res) => {
        controlRoutes.deleteUserAccount(req, res);
    }).put('withdraw/:passportId', (req, res) => {
        controlRoutes.withdrawMoney(req, res);
    }).put('/depositing', (req, res) => {
        controlRoutes.depositing(req, res);
    }).put('/transferring', (req, res) => {
            usersController.transferrMoney(req, res);
        })

module.exports = router;