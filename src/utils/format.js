
const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feria",
  "Quarta-feria",
  "Quinta-feria",
  "Sexta-feria",
  "Sábado",
]

function getSubject(subjectNumber){
  const arrayPosition = +subjectNumber - 1;
  return subjects[arrayPosition];
}

function convertTimeToMinutes(time){
  const [hour, minutes] = time.split(":");
  return Number((hour * 60) + minutes);
}

module.exports = {
  subjects,
  weekdays,
  getSubject,
  convertTimeToMinutes
}