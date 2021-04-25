const mongoose = require('mongoose');
const validator = require('validator');


const user = new mongoose.Schema({
	passportId: {
		type: String,
		required: true,
		unique: true,
		validate(value) {
            if (value.length !== 9 ) {
                throw new Error('Invalid passport ID!');
            }
        }
	},
	cash: {
		type: Number,
		default: 0,
	},
	credit: {
		type: Number,
		default: 0,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Unvalid email');
			}
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
});





const UserModel = mongoose.model('user', user);
module.exports = UserModel;

