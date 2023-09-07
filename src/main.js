import { config } from "dotenv";
config({ path: process.ENV })
import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import routerProducts from './routes/products.routes.js'
import routerCarts from './routes/cart.routes.js'
import routerViews from './routes/views.routes.js'
import { conexionIO } from './controllers/socket.io.js'

const PORT = 8080
const app = express()

// Conexion a Mongodb Atlas
mongoose.connect(process.env.MONGODB_ATLAS_API_KEY)
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
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')


//Routes
app.use('/static', express.static('src/public')) // Rutas publicas
app.use('/api/products', routerProducts) // Ruta productos
app.use('/api/carts', routerCarts)  // Ruta de carritos
app.use('/static', routerViews) // Ruta de vistas Handlebars

app.get('*', (req, res) => {
    res.status(404).send("Error 404")
})