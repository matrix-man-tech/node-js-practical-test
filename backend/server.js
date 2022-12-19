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


app.use('/api/users',userRoutes)

// const __dirname = path.resolve()


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  } 

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT,() => console.log(`Server is connected at port ${PORT}`))