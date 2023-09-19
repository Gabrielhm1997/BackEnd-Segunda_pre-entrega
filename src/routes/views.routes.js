import { Router } from "express"
import PORT from "../main.js"
import userModel from "../models/users.models.js"
import 'dotenv/config'

const routerViews = Router()


// Vista de login
routerViews.get('/', async (req, res) => {

    if (req.session.login) {
        res.status(200).redirect('/static/products')
    } else {
        res.status(200).render('login', {
            script: "login",
            title: "Login",
            css: "login",
            port: PORT
        })
    }
})

routerViews.post('/', async (req, res) => {

    let email = req.body.email
    let password = req.body.password

    if (req.session.login) {
        res.status(200).redirect('/static/products')   
    } else if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
        req.session.login = true
        req.session.email = email
        res.status(200).redirect('/static/products')
    } else {
        try {
            let user = await userModel.findOne({ email: email })
            if (user && user.email == email) {
                if (user.password == password) {
                    req.session.login = true
                    req.session.email = email
                    res.status(200).redirect('/static/products')
                } else {
                    req.session.error = "Invalid Password"
                    res.status(401).redirect('/static')
                }
            } else {
                req.session.error = "Not found"
                res.status(404).redirect('/static')
            }
        } catch (error) {
            console.log(error)
            req.session.error = error
            res.status(401).redirect('/static')
        }
    }
})

routerViews.get('/register', async (req, res) => { // Vista de registro

    if (req.session.login) {
        res.status(200).redirect('/static/products')
    } else {
        res.status(200).render('register', {
            script: "register",
            title: "Register",
            css: "login"
        })
    }
})

routerViews.get('/profile', async (req, res) => { // Vista de perfil

    if (req.session.login) {
        res.status(200).render('profile', {
            script: "profile",
            title: "Profile",
            css: "profile"
        })
    } else {
        res.status(200).redirect('/static')
    }
})

routerViews.get('/products', async (req, res) => { // Vista de perfil

    if (req.session.login) {
        res.status(200).render('products', {
            script: "products",
            title: "Products",
            css: "products",
            port: PORT
        })
    } else {
        res.status(200).redirect('/static')
    }
})

routerViews.get('/chat', async (req, res) => { // Vista de los mensajes
    res.status(200).render('chat', {
        script: "chat",
        title: "Chat",
        css: "chat"
    })
})

routerViews.get('/admin', async (req,res) => {

    if (req.session.login && req.session.email == process.env.ADMIN_EMAIL) {
        res.status(200).render('admin', {
            script: "admin",
            title: "Admin",
            css: "admin"
        })
    } else {
        res.status(200).redirect('/static')
    }
    
})

export default routerViews