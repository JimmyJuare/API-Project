const express = require('express');
const router = express.Router();
const { Spot, Review, User, SpotImage, Booking} = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
      // Find the image by its ID and ensure it belongs to the current user
      const image = await SpotImage.findOne({
        where: {
          id: imageId
        },
        include: [{
          model: Spot,
          where: {
            ownerId: req.user.id
          }
        }]
      });
  
      // If the image doesn't exist or doesn't belong to the user, return an error response
      if (!image) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
      }
  
      // Delete the image
      await image.destroy();
  
      // Return a success response
      return res.status(200).json({ message: 'Successfully deleted' });
  });
  
module.exports = router;
