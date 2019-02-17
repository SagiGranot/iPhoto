var mongoose    =   require('mongoose');

var user = new mongoose.Schema({
        userID: String,
        name: String,
        email: String,
        password: String,
        group: {
            type: String,
            enum: ['USER','PHOTOGRAPHER','ADMIN'],
            default: 'USER'
        }
    });

var User       =   mongoose.model('User', user);
module.exports =   User;