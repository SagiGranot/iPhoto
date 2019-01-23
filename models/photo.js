var mongoose    =   require('mongoose');

var photo = new mongoose.Schema({
        photoID: String,
        name: String,
        URL: String,
        userID: String,
        likes: Number,
        likes_array: [String], //include the users id
        num_of_rates: Number, // how many people rated
        rates_sum: Number,
        rates_array: [String], //include the users id
        total_rate: Number   
    });

var Photo       =   mongoose.model('Photo', photo);
module.exports  =   Photo;