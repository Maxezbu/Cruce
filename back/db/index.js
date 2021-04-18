
const Sequelize = require ('sequelize')
const db = new Sequelize ( "postgres:/cruce",
   
{
    logging: false,
    dialect: "postgres",
  })

module.exports = db



