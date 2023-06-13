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
        onDelete: 'CASCADE',
        hooks: true
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
      allowNull: false,
      validate: {
        isDecimal: true
      },
    },
    lng: {
      type: DataTypes.DECIMAL(10,15),
      allowNull: false,
      validate: {
        isDecimal: true
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 30]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 256]
      }
    },
    price: {
      type: DataTypes.DECIMAL(5, 2), // Maximum 5 digits with 2 decimal places
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    avgRating: {
      type: DataTypes.DECIMAL(1, 1), // Maximum 3 digits with 1 decimal place
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
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
