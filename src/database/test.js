const database = require('./db');
const createProffy = require('./createProffy')

database.then(async (db) => {
  
  proffyValue = {
    name:"Albert Einstein",
    avatar:"https://tinyurl.com/y5oe26tx",
    whatsapp:"92981926618",
    bio:"Albert Einstein foi um físico teórico alemão."
  },

  classValue = {
    subject: 1,
    cost:"1000"
  },

  classSchedulesValues = [
    {
      weekday: 0,
      time_from: 600,
      time_to: 1800
    },
    {
      weekday: 1,
      time_from: 1600,
      time_to: 500
    },
  ]

 await createProffy(db, { proffyValue, classValue, classSchedulesValues })

  const selectedProffys = await db.all("SELECT * FROM proffys");

  // const selectedProffysClassesAndProffys = await db.all(`
  //   SELECT classes.*, proffys.* 
  //   FROM proffys
  //   JOIN classes ON (classes.proffys_id = proffys.id)
  //   WHERE classes.proffys_id = 1 
  // `);

  // const selectedClassesSchedule = await db.all(`
  //   SELECT class_schedules.* 
  //   FROM class_schedules
  //   WHERE class_schedules.class_id = 1
  //   AND class_schedules.weekday = "0"
  //   AND class_schedules.time_from <= "680"
  //   AND class_schedules.time_to > "680"
  // `)

});