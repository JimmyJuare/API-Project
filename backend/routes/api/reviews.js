const express = require('express');
const router = express.Router();
const { Spot, Review, User, ReviewImage } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async(req, res) => {
    const Reviews = await Review.unscoped().findAll({
        where:{
            userId:req.user.id
        },
        include:[User, Spot, ReviewImage]
    })
    res.status(200).json({Reviews})
})
module.exports = router;
