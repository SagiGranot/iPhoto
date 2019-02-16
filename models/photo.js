var mongoose    =   require('mongoose');

var photo = new mongoose.Schema({
        photoID: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        URL: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        likes: Number,
        likes_array: [String], //include the users id
        num_of_rates: Number, // how many people rated
        rates_sum: Number,
        rates_array: [String], //include the users id
        total_rate: {
            type: Number,
            min: 0,
            max: 5
        }   
    });

var Photo       =   mongoose.model('Photo', photo);
module.exports  =   Photo;