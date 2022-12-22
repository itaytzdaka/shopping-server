const User = require("../models/user");

// Get all users names: 
function getAllUsersEmailsAsync() {
    return User.find({},{_id: 0,email: 1}).exec(); // exec returns a Promise.
}

function addUserAsync(userToAdd){
    return userToAdd.save(); // save returns a Promise
}

function getAllUsersNamesIncludingCitiesAsync() {
    return User.find().populate("city").exec();
}

//login a user
function loginAsync(credentials) {
    return User.findOne({email: credentials.email, password: credentials.password}).select('-password').exec();
}

module.exports = {
    getAllUsersEmailsAsync,
    addUserAsync,
    getAllUsersNamesIncludingCitiesAsync,
    loginAsync
};