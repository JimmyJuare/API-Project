'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        hooks: true
      }),
      Spot.hasMany(models.Review, {
        foreignKey:'spotId'
      }),
      Spot.hasMany(models.SpotImage, {
        foreignKey:'spotId'
      }),
      Spot.hasMany(models.Booking, {
        foreignKey:'spotId'
      });
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 30]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    lat: {
      type: DataTypes.DECIMAL(10,15),
      allowNull: true,
      validate: {
        isDecimal: true
      },
    },
    lng: {
      type: DataTypes.DECIMAL(10,15),
      allowNull: true,
      validate: {
        isDecimal: true
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(5, 2), // Maximum 5 digits with 2 decimal places
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Spot;
};
