var mongoose    =   require('mongoose');

var user = new mongoose.Schema({
        userID: String,
        name: String,
        email: String
    });

var User       =   mongoose.model('User', user);
module.exports =   User;