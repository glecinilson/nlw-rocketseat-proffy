const { subjects, weekdays, getSubject, convertTimeToMinutes } = require('../utils/format')
const database = require('../database/db')

module.exports = async function pageStudy (request, response) {
  const filters = request.query;

  if(!filters.subject || !filters.weekday || !filters.time){
    console.log("Page esta funcionado porem sem retorno do filtro.")
    return response.render("study.html", { filters, subjects, weekdays });
  }

  const timeToMinutes = convertTimeToMinutes(filters.time);

  const query = `
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffys_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedules.* 
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${timeToMinutes}
      AND class_schedules.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
  `
  try {
    const db = await database;
    const proffys = await db.all(query);

    proffys.map((proffy) => {
      proffy.subject = getSubject(proffy.subject);
    })

    return response.render("study.html", { proffys, filters, subjects, weekdays })
    
  } catch (error) {
    console.log(error);
  }
}