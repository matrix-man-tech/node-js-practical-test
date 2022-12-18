const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const { authMiddleware} = require('./middlewares/authMiddleware')
const userRoutes = require('./routes/userRoutes')
const { errorHandler,notFound } = require('./middlewares/errorHandler')
const path = require("path")
var cors = require('cors')

const app = express()
dotenv.config()
dbConnect()

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
app.use(cors());
app.options('*', cors())


// app.set('view engine', 'hbs')
app.use('/api/users',userRoutes)

// app.get("/", (req, res) => {
//     res.render("index")
// })

// app.get("/register", (req, res) => {
//     res.render("register")
// })

// app.get("/login", (req, res) => {
//     res.render("login")
// })

app.use(notFound)
app.use(errorHandler)

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))


const PORT = process.env.PORT

app.listen(PORT,() => console.log(`Server is connected at port ${PORT}`))