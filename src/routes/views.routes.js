import { Router } from "express"
import productModel from "../models/products.models.js"
import cartModel from "../models/cart.models.js"

const routerViews = Router()

routerViews.get('/chat', async (req, res) =>{ // Vista de los mensajes
    res.status(200).render('chat', {
        script: "chat",
        title: "Chat",
        css: "chat"
    })
})

routerViews.get('/products', (req, res) => {

    productManager.getProducts()
        .then(response => {

            const inventory = response

            res.status(200).render('home', {
                script: "home",
                title: "Home",
                css: "home",
                inventory: inventory
            })
        })
        .catch(error => res.status(400).send(error))
})

routerViews.get('/carts/:cid', (req, res) => {
    
})

export default routerViews