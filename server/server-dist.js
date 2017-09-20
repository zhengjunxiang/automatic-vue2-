/* eslint-disable */
const path = require('path')
const history = require('connect-history-api-fallback');
const express = require('express')
const app = express();
const router = express.Router()

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index')
})

app.set('views', path.join(__dirname, '../dist'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use('/', express.static(path.join(__dirname, '../dist')))

app.use(history({
  rewrites: [
    { from: /.*/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(9090, '192.168.170.140', () => {
  console.log('ther server is running at port ' + 9090)
})
