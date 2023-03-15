const User = require("../models/user");
const hash = require("../helpers/hash");

// Get all users emails: 
function getAllUsersEmailsAsync() {
    return User.find({},{_id: 0,email: 1}).exec(); // exec returns a Promise.
}

//add a new registered user
function addUserAsync(userToAdd){
    userToAdd.password = hash(userToAdd.password);
    return userToAdd.save(); // save returns a Promise
}


//get user data by email and password
function loginAsync(credentials) {
    credentials.password = hash(credentials.password);
    return User.findOne({email: credentials.email, password: credentials.password}).select('-password').exec();
}

module.exports = {
    getAllUsersEmailsAsync,
    addUserAsync,
    loginAsync
};