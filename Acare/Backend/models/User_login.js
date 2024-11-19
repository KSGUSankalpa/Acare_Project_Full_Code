const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_loginSchema = new Schema({
    userid: String,
    name: String,
    email: String,
    password: String
});

const User_login = mongoose.model('User_login', user_loginSchema);
module.exports = User_login;