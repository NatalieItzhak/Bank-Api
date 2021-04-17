const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('uuid');
const usersJson = require('../users.json')


//all users
const getAllUsers = (req, res) => {
    return res.status(200).json({ users: usersJson.users });
};

//user by id
const getUserById = (req, res) => {
    const user = usersJson.users.find((u) => u.passportId === parseInt(req.params.passportId))
    if (user) {
        return res.send({ user });
    }
    else {
        res.status(404).json(`No user with the Id of ${req.params.passportId} was found`)
    }
};

// Add new user
const addNewUser = (req, res) => {
    const newUser = {
        passportId: uuid.v4(),
        cash: req.body.cash,
        credit: req.body.credit,
        isActive: true
    }

    if (!newUser.cash || !newUser.credit) {
        res.status(404).json({ msj: 'Please include a cash and credit' });
    }

    usersJson.users.push(newUser);
    res.json(usersJson.users)
    res.send(`User with Passport Id number ${user.passportId} added to the database, Cash: ${user.cash}, Credit: ${user.credit}`);
}

//update credit
const updateUserCredit = (req, res) => {
    const user = usersJson.users.find((u) => u.passportId === parseInt(req.params.passportId))
    if (user) {
        const credit = req.body.credit;
        usersJson.users.forEach(user => {
            if (user.passportId === parseInt(req.params.passportId)) {
                user.credit = req.body.credit ? credit : user.credit;
                fs.writeFileSync('../users.json', JSON.stringify(usersJson));
                res.json({ msg: 'User credit updated', user })
            }
        })
    }
    else {
        res.status(404).json(`No user with this Id was found`)
    }
};
//withdraw money
const withdrawMoney = (req, res) => {
    const user = usersJson.users.find((u) => u.passportId === parseInt(req.params.passportId))
    if (user) {
        const cash = req.body.cash;
        usersJson.users.forEach(user => {
            if (user.passportId === parseInt(req.params.passportId)) {
                user.cash = req.body.cash ? cash : user.cash;
                fs.writeFileSync('../users.json', JSON.stringify(usersJson));
                return res.status(200).json({ msg: 'successful action', user });
            }
        })

    }
    else {
        res.status(404).json(`No user with this Id was found`)
    }

    return res.status(404).send('The requested amount was declared');

};

//delete user
const deleteUserAccount = (req, res) => {
    const user = usersJson.users.find((u) => u.passportId === parseInt(req.params.passportId))
    if (user) {
        users.map((u,index)=>{
            if(u.id == userId){
                users.splice(index,1);
                fs.writeFileSync('../users.json', JSON.stringify(usersJson));
                return res.status(200).json({success: 'User deleted successfully'});
            }
        })
    }
    else {
        res.status(404).json(`No user with the Id of ${req.params.passportId} was found`)
    }
};

const transferringMoney = (req, res) => {
    const { Id1, Id2, amount } = req.body;
    if (Id1 < 0 ||  Id2 < 0 || amount < 1) {
        return res.status(404).send('Must include a valid IDs and a positive cash amount.');
    }
    else {
        usersJson.users.forEach(user => {
            if (user.passportId== Id1) {
                user.cash -= amount;
            }
            else if (user.passportId == Id2) {
                user.cash += amount;
            }
        })
        fs.writeFileSync('../users.json', JSON.stringify(usersJson));
        res.status(200).send('successfully transfer money');
    }
}

const depositing = (req, res) => {
    const { passportId , cash } = req.body;
    if (passportId < 0 || cash < 1) {
        return res.status(404).send('Must include a valid ID and a positive amount of money.');
    }
    else if (!getUserById(passportId)) {
        return res.status(404).send('The User is not exists.');
    }
    else {
        usersJson.users.forEach(user => {
            if (user.passportId== passportId) {
                user.cash += cash;
            }
        })
        fs.writeFileSync('../users.json', JSON.stringify(usersJson));
        res.status(200).send('Successfully deposited.');
    }
}
const isUserActive = (passportId) => {
    const user = usersJson.users.find(user => user.passportId == passportId);
    return user.isActive ? true : false;
}
module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUserCredit,
    withdrawMoney,
    deleteUserAccount,
    depositing,
    transferringMoney,
    isUserActive
}