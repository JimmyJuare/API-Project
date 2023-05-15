'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users','firstname',{
      type:Sequelize.STRING(10),
      allowNull:false,
      defaultValue:''
    }),
    await queryInterface.addColumn('Users','lastname',{
      type:Sequelize.STRING(10),
      allowNull:false,
      defaultValue:''
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users','firstname');
    await queryInterface.removeColumn('Users','lastname');
  }
};
