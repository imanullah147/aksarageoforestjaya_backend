"use strict";
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        email: "odhi",
        nama: "Odhi Ahmad",
        password: hashSync("admin123", genSaltSync(10)),
        role: "1",
        status: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "rudi",
        nama: "Rudi Maliq",
        password: hashSync("admin123", genSaltSync(10)),
        role: "1",
        status: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "rani",
        nama: "Rani Masyithah",
        password: hashSync("admin123", genSaltSync(10)),
        role: "1",
        status: "1",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
