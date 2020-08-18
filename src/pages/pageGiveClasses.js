
const { subjects, weekdays, convertTimeToMinutes } = require('../utils/format')
const database = require('../database/db')
const createProffy = require('../database/createProffy')


function pageGiveClasses (request, response) {
  return response.render(`give-classes.html`, { subjects, weekdays } )
}

async function saveClasses(request, response) {
  const {name, avatar, whatsapp, bio, subject, cost, weekday, time_from, time_to} = request.body;

  const proffyValue = {
    name,
    avatar,
    whatsapp,
    bio
  }

  const classValue = {
    subject,
    cost
  }

  const classSchedulesValues = weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertTimeToMinutes(time_from[index]),
      time_to: convertTimeToMinutes(time_to[index])
    }
  });

  try {
    const db = await database;
    await createProffy(db, { proffyValue, classValue, classSchedulesValues});
  } catch (error) {
    console.log(error)    
  }

  let queryString = `?subject=${subject}`;
  queryString += `&weekday=${weekday[0]}`;
  queryString += `&time=${time_from[0]}`;

  setTimeout(2000);
  return response.redirect(`/study${queryString}`);
}

module.exports =  {
  pageGiveClasses,
  saveClasses
}