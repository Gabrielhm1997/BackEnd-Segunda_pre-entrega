import { config } from "dotenv"
config({ path: process.ENV })
import express from 'express'
import session from "express-session"
import cookieParser from "cookie-parser"
import mongoose from 'mongoose'
import MongoStore from "connect-mongo"
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import routerProducts from './routes/products.routes.js'
import routerCarts from './routes/cart.routes.js'
import routerViews from './routes/views.routes.js'
import routerSessions from "./routes/sessions.routes.js"
import routerUsers from "./routes/users.routes.js"
import { conexionIO } from './controllers/socket.io.js'

const PORT = 8080
export default PORT
const app = express()

// Conexion a Mongodb Atlas
mongoose.connect(process.env.MONGODB_ATLAS_API_KEY) // Use Dotenv para resguardar la conexion a la db
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error))

// Server socket.io
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)
conexionIO(io) // Funcion con las conexiones de Socket.io

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_ATLAS_API_KEY,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 90
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')


//Routes
app.use('/static', express.static('src/public')) // Rutas publicas
app.use('/api/products', routerProducts) // Ruta productos
app.use('/api/carts', routerCarts)  // Ruta de carritos
app.use('/static', routerViews) // Ruta de vistas Handlebars
app.use('/api/sessions', routerSessions) // Ruta de sesiones
app.use('/api/users', routerUsers) // Ruta de usuarios

app.get('*', (req, res) => {
    res.status(404).send("Error 404")
})