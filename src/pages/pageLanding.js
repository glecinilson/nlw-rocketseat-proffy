
const database = require('../database/db');

module.exports = async function pageLanding (require, response) {

  const query = `SELECT COUNT(id) AS total FROM proffys`;

  try {
    const db = await database;
    const totals = await db.all(query);

    console.log(totals)
    
    return response.render("index.html", { totals });
    
  } catch (error) {
    console.log(error);
  }

}