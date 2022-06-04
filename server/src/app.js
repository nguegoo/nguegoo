const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const path = require('path')


//app
const app = express()
const http = require('http').Server(app)

// socket io
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        credentials: true
    }
})
require('./api/socket')(io)
    /*io.on('connection', (socket) => {
    	console.log('A client connected with id ' + socket.id)
    	socket.on('send-message', (data) => {
    		console.log("message sended")
    		console.log(data)
    	})
    })*/
const Router = express.Router()

//session
app.use(session({
        secret: 'nguegooisecret@ciron7.dev-data&optimiser',
        resave: true,
        saveUninitialized: true
    }))
    // passport config


//passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./auth/passport')(passport)
    // connect flash
app.use(flash())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    //User
const User = require('./models/User')
    // Produit
const Produit = require('./models/Produit')
const Message = require('./models/Message')
    //imprtation du modele categorie grossiste
const CategorieGrossiste = require('./models/CategorieGrossiste')
    //importation du modele grossiste
const Grossiste = require('./models/Grossiste')

app.use(express.static(path.join(__dirname, 'public/media')))


//config
const config = require('./config/config')

//sequelize connection
const sequelize = require('./config/database')

//Middlewares

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true, }))
    //app.use(morgan('combined'))

//Routes

// user router
app.use('/user', require('./routes/userRouter'))


// categorie grossiste router
app.use('/categorie-grossiste', require('./routes/categorieGrossisteRouter'))
    //grossiste router
app.use('/grossiste', require('./routes/grossisteRouter'))


// category router
app.use('/categorie', require('./routes/categorieProduitRouter'))

// product router
app.use('/produit', require('./routes/produitRouter'))

//Pannier router
app.use('/pannier', require('./routes/pannierRouter'))

//Partenaire router
app.use('/partenaire', require('./routes/partenaireRouter'))

//Statistique router
app.use('/statistique', require('./routes/statistiqueRouter'))

sequelize.sync()
    .then(() => {
        http.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`)
        })
    })