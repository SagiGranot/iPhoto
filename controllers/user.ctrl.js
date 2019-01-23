const connection    = require('../database'),
      User          = require('../models/user'),
      photo         = require('../models/photo');
      
module.exports = {
    addUser(req, res, next){
        const{
            userID  = null,
            name    = null,
            email   = null
        } = req.body
        const user  = new User ({userID, name, email})
        user.save()
        .then(result => {
            console.log("User added!")
            res.json(result)
        })
        .catch(err => {
            console.error(err)
            res.status(404).send("not found")
        })
    },

    getProfile(req, res, next){
        const {id = null} = req.params
        let s1,s2;
        User.find({userID: id})
        .then(result => {
            s1 = result
            return photo.find({userID: id})
        })
        .then(result => {
            s2 = s1.concat(result)
            res.json(s2)
        })
        .catch(err => {
            console.error(err)
        })
    }
}