'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
            model:'Spots',
            key: 'id',
        },
        onDelete: 'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model:'Users',
            key: 'id',
        },
        onDelete: 'cascade'
      },
      review: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          len:[5, 256]
        }
      },
      stars: {
        type: Sequelize.DECIMAL(3, 2), 
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1.00,
          max: 5.00,
        },
      },
      createdAt: {
        type:Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.dropTable(options);
  }
};
