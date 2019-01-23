const   connection = require('../database'),
        Photo      = require('../models/photo');

module.exports = {
    sortByLikes(req, res, next){
        Photo.find().sort({likes: -1})
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("not found")
        })
    },
    sortByRates(req, res, next){
        Photo.find().sort({total_rate: -1})
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("not found")
        }) 
    },
    addLike(req, res, next){
        const {id = null} = req.params
        Photo.updateOne({photoID: id}, {$inc: {likes: 1}})
        .then(result => {
            console.log("Like added!")
            res.json(result)
        }).catch(err => {
            res.status(404).send("not found")
        })
    },

    addRate(req, res, next){
        const {
            id  = null,
            num = null
        } = req.params
        let rate=parseInt(num,10)
        Photo.updateOne({photoID: id}, {$inc: {num_of_rates: 1, rates_sum: rate}})
        .then(result => {
            console.log("Rate updated!")
            return Photo.find({photoID: id})
        })
        .then(result => {
         // need to update total_rate = rates_sum / num_of_rates
        // get rates_sum & num_of_rates
            let sum     = parseInt(result[0].rates_sum)
            let number  = parseInt(result[0].num_of_rates)
            let avg     = sum / number
            return Photo.updateOne({photoID: id}, {total_rate: avg})
        })
        .then(result => {
            console.log("Rate added!")
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("not found")
        })
    }
}
