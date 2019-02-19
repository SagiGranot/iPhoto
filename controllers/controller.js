const connection = require('../database'),
      Photo      = require('../models/photo');
let   generator  = 1000;

module.exports = {
    //show all photos
    fetchAllphotos(req, res, next){         
        Photo.find({})
        .then(result => {
            res.json(result)
        }) 
        .catch( err => {
            res.status(404).send("not found")
        })
    },
    addPhoto(req, res, next){
        const{
            name    = null,
            URL     = null,
            userID  = null
        } = req.body
        const photoID = generator++;
        //initialize likes and rate:
        let likes = 0, likes_array = [], num_of_rates=0, rates_sum=0,rates_array=[], total_rate=0;
        const photo = new Photo ({photoID, name, URL, userID, likes, likes_array, num_of_rates, rates_sum,rates_array,total_rate})
        photo.save()
        .then(result => {
            console.log("Photo added!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send(err)
        })
    },

    deletePhoto(req, res, next){
        const {id = null} = req.params
        Photo.deleteOne({photoID: id})
        .then(result => {
            console.log("Photo deleted!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send("not found") 
        })       
    },

    editPhoto(req,res, next){
        const { id   = null } = req.params
        const { name = null } = req.body 
        Photo.updateOne({photoID: id}, {name: name})
        .then(result => {
            console.log("Photo updated!")
            res.json(result)
        }) 
        .catch(err => {
            res.status(404).send("not found")
        })  
    },
    fallback(req,res) {
        res.send("This is 404 page, please check API documentation: https://iphoto-app.herokuapp.com/apidoc")
    },
    getDocumentation(req,res) {
        res.redirect("https://documenter.getpostman.com/view/5685552/RztfxCet")
    }
}