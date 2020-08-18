const express = require('express');
const nunjucks = require('nunjucks');
const pageStudy = require('./pages/pageStudy')
const pageLanding = require('./pages/pageLanding')
const { pageGiveClasses, saveClasses } = require('./pages/pageGiveClasses')

const app = express();
const PORT = 3000;

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
})

app
.use(express.urlencoded({extended: true}))
.use(express.static('public'))
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)
.listen(PORT, 
  console.log(`Running server on port ${PORT}`)
)