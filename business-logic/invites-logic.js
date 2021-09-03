const Invite = require("../models/invite");

// Get all users names: 
function getAllInvitesAsync() {
    return Invite.find().exec(); // exec returns a Promise.
}
function getAllInvitesFromDeliveryDateTillTodayAsync(dateJason) {
    return Invite.find({ deliveryDate: { $gte: dateJason }}).exec(); // exec returns a Promise.
}

function getAllInvitesWithUserAndCartAsync() {
    return Invite.find().populate("user").populate("cart").populate("city").exec(); // exec returns a Promise.
}

function addInviteAsync(inviteToAdd){
    return inviteToAdd.save(); // save returns a Promise
}

function getNumberOfInvitesAsync(){
    return Invite.countDocuments().exec();
}

function getAllInvitesOfUserAsync(_id) {
    return Invite.find({ userId: _id}).populate("user").populate("cart").populate("city").exec(); // exec returns a Promise.
    // return Invite.find({ userId: _id},{"userId":0}).populate("user").populate("cart").populate("city").exec(); // exec returns a Promise.
    // return Invite.find({ userId: _id}).populate('user, cart,city').populate("cart").populate("city").select("-userId").exec(); // exec returns a Promise.
}

module.exports = {
    getAllInvitesAsync,
    getAllInvitesFromDeliveryDateTillTodayAsync,
    getAllInvitesWithUserAndCartAsync,
    addInviteAsync,
    getNumberOfInvitesAsync,
    getAllInvitesOfUserAsync
};