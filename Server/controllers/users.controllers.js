const express = require('express');
const router = express.Router();
const User = require('../models/user.model');



//all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).json({ "error": error });
    }
};

//user by id
const getUserById = async (req, res) => {
    const passportId = req.params.passportId;
    try {
        const findUser = await User.findOne({ passportId });
        if (!findUser) {
            return res.status(404).send();
        }

        res.status(200).send(findUser);
    } catch (err) {
        res.status(404).send(err);
    }
}

// Add new user
const addNewUser = async (req, res) => {

    const { passportId, cash, credit, name, email } = req.body;
    let user = {};
    user.passportId = passportId;
    user.cash = cash;
    user.credit = credit;
    user.name = name;
    user.email = email;
    let newUser = new User(user)
    const addedUser = await newUser.save();
    res.json(addedUser)
    res.status(201).send(addedUser);

    if (!user.cash || !user.credit) {
        res.status(404).json({ msj: 'Please include a cash and credit' });
    }
    res.send(`User with Passport Id number ${user.passportId} added to the database, Cash: ${user.cash}, Credit: ${user.credit}`);
}


//update credit
const updateUserCredit = async (req, res) => {
    const passportId = req.params.passportId;
    const credit = req.body.credit;
    try {
        const user = await User.findOneAndUpdate({ passportId }, credit, {
            new: true,
            useFindAndModify: false,
        });
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send('error');
    }
};
//withdraw money
const withdrawMoney = async (req, res) => {
    const passportId = req.params.passportId;
    const body = req.query;
    try {
        const withdrawUser = await User.findOne({ passportId: req.body.passportId });
        let userMoney = withdrawUser.cash;
        if (userMoney - body.cash < -withdrawUser.credit) {
            return res.status(400).send({ error: 'Not enough money' });
        }
        usersCurrentMoney -= Number(body.cash);
        const user = await User.findOneAndUpdate(
            { passportId },
            { cash: usersCurrentMoney },
            {
                new: true,
                useFindAndModify: false,
            }
        );
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//delete user
const deleteUserAccount = async (req, res) => {
    const passportId = req.params.passportId;
    try {
        const user = await User.findOneAndDelete({ passportId });
        if (!user) {
            return res.status(404).send('user not found');
        }
        else {
            return res.status(200).json({ success: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(400).send('not a valid params');
    }
};

const transferringMoney = async (req, res) => {
    const { fromUser, toUser, cash } = req.query;
    const from = await User.findOne({ passportId: from });
    const to = await User.findOne({ passportId: to });
    //! check for prerequisite
    if (!from || !to) {
        return res.status(404).send({ error: 'Error' });
    }
    if (from.cash - cash < -from.credit) {
        return res
            .status(404)
            .send({ error: `User doesn't have enough credit` });
    }
    const Id1 = await User.findOneAndUpdate(
        { passportId: fromUser },
        { cash: from.cash - cash },
        {
            new: true,
        }
    );
    const Id2 = await User.findOneAndUpdate(
        { passportId: toUser },
        { cash: to.cash + Number(cash) },
        {
            new: true,
        }
    );
    res.send([Id1, Id2]);
};


const depositing = async (req, res) => {
    const { passportId, cash } = req.body;
    try {
        const userDeposit = await User.find({ passportId });
        cash = Number(body.cash) + Number(userDeposit[0].cash);
        const user = await User.findOneAndUpdate({ passportId }, body, {
            new: true,
        });
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send('not a valid params');
    }
};

const
    isUserActive = (passportId) => {
        const user = User.find(user => user.passportId == passportId);
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