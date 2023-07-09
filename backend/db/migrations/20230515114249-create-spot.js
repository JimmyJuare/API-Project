'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
            model:'Users',
            key: 'id',
        },
        onDelete: 'cascade'
      },
      address: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull:true
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull:true
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      description: {
        type: Sequelize.STRING(256),
        allowNull:false
      },
      price: {
        type: Sequelize.DECIMAL(5,2),
        allowNull:false
      },
      createdAt: {

        type:Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.dropTable(options);
  }
};
