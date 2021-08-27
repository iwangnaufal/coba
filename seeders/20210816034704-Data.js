'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users',[
      {
        name: "budi",
        email: "budi@gmail.com",
        password: "abcdef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "andi",
        email: "andi@gmail.com",
        password: "dcsf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "siti",
        email: "siti@gmail.com",
        password: "qwe",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
