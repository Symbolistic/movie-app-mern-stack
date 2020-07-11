const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", auth, (req, res) => {
    // Find favorite information inside Favorite Collection by Movie ID
    Favorite.find({ "movieId": req.body.movieId })
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, FavoriteNumber: favorite.length })
        })
});

router.post("/favorited", auth, (req, res) => {
    // Find favorite information inside Favorite Collection by Movie ID and userFrom

    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)

            // How can we know if I already favorited this movie or not
            let result = false;
            if(favorite.length !== 0) {
                result = true;
            }

            res.status(200).json({ success:true, favorited: result })
        })
});

router.post("/addToFavorite", auth, (req, res) => {
    // Save information about the movie or user ID inside Favorite Collection
    const favorite = new Favorite(req.body)
    console.log(favorite)

    favorite.save((err, doc) => {
        if(err) return res.json({ success:false, err });
        return res.status(200).json({ success:true })
    })
});

router.post("/removeFromFavorite", auth, (req, res) => {

    // Find favorite information and remove it
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec(( err, doc ) => {
            if(err) return res.status(400).send({ success:false, err })
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFavoriteMovie", auth, (req, res) => {

    // Find the logged in users favorite movies
    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec(( err, favorites ) => {
            if(err) return res.status(400).send({ success:false, err })
            res.status(200).json({ success: true, favorites })
        })
});



module.exports = router;
