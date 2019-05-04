const express = require('express')
const bodyParser = require("body-parser")
const routes = require('./routes')
const morgan = require('morgan')
const expressValidator = require('express-validator')
const DbClass = require('./components/Db/Db')
const app = express()
// database 
new DbClass()

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.status(200).send({ message: "options" })
    } else {
        next()
    }
}

app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(expressValidator())
app.use(morgan('tiny'))
app.use(
  routes.ProjectsRoutes,
  routes.UsersRoutes,
  routes.TasksRoutes,
  routes.ClientsRoutes,
  routes.KPIs
)

const server = require('http').createServer(app)

if (process.env.NODE_ENV === 'production') {
  console.log("Production Server Environment")
  server.listen(process.env.PORT || 8000)
} else if (process.env.NODE_ENV === 'development') {
  console.log("Development Server Environment")
  server.listen(process.env.PORT || 80)
}

