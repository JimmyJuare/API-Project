'use strict';
const Datatype = require('faker/lib/datatype');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //spot done
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        hooks: true
      });
      //user done
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        hooks: true
      }),
      Review.hasMany(models.ReviewImage,{
        foreignKey:'reviewId',
        hooks:true
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    review:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,256]
      }
    },
    stars: {
        type: DataTypes.DECIMAL(3, 2), 
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1,
          max: 5,
        },
      },
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Review;
};
