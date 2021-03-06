const   connection = require('../database'),
        Photo      = require('../models/photo');
module.exports = {
    sortByLikes(req, res, next){
        Photo.find().sort({likes: -1}).limit(6)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("not found")
        })
    },
    sortByRates(req, res, next){
        Photo.find().sort({total_rate: -1}).limit(6)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("not found")
        }) 
    },
    addLike(req, res, next){
        const { id = null,
                user = null } = req.params
        Photo.findOne({photoID: id})
        .then(data => {
            data.likes_array.map(userid => {
                if(userid === user)
                    throw new Error("already liked this photo")
            })
            return Photo.updateOne({photoID: id}, {$inc: {likes: 1}})
        })
        .then(result => {
            return Photo.updateOne({photoID: id}, {$push: {likes_array: user}})
            
        }).then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("ERROR:" + err)
        })
    },

    addRate(req, res, next){
        const {
            id  = null,
            num = null,
            user = null,
            group = null
        } = req.params
        let rate=parseInt(num,10)
        if ((rate>5)||(rate<1))
            throw new Error('rate error!')
        Photo.findOne({photoID: id})
        .then(data => {
            data.rates_array.map(userid => {
                if(userid === user)
                    throw new Error("already rated this photo")
            })
            //PHOTOGRAPHER user has more weight for rates
            if ((group === 'USER')||(group === 'ADMIN'))
                return Photo.updateOne({photoID: id}, {$inc: {num_of_rates: 1, rates_sum: rate}})
            else if (group === 'PHOTOGRAPHER')
                return Photo.updateOne({photoID: id}, {$inc: {num_of_rates: 5, rates_sum: 5*rate}})

        })
        .then(result => {
            return Photo.updateOne({photoID: id}, {$push: {rates_array: user}})
            
        })
        .then(result => {
            return Photo.find({photoID: id})
        })
        .then(result => {
         // need to update total_rate = rates_sum / num_of_rates
        // get rates_sum & num_of_rates
            let sum     = parseInt(result[0].rates_sum)
            let number  = parseInt(result[0].num_of_rates)
            if(number === 0)
                throw new Error("cant calculate rate")
            let avg     = sum / number
            return Photo.updateOne({photoID: id}, {total_rate: avg})
        })
        .then(result => {
            console.log("Rate added!")
            res.json(result)
        })
        .catch(err => {
            res.status(404).send("Error:"+err)
        })
    }
}
