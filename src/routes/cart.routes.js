import { Router, query } from "express"
import cartModel from "../models/cart.models.js"
import productModel from "../models/products.models.js"

const routerCarts = Router()


routerCarts.post('/', async (req, res) => { // Crea un nuevo carrito

    try {

        const cart = await cartModel.create({})
        res.status(201).send(cart)//`Cart created successfully`

    } catch (error) {
        res.status(400).send(`Error creating a new cart: ${error}`)
    }

})

routerCarts.post('/:cid/products/:pid', async (req, res) => { // Agrega un producto por su id al carrito

    const { cid, pid } = req.params
    const { quantity } = req.body


    try {

        const cartFound = await cartModel.findById(cid)

        if (cartFound) {

            const productCollectionFound = await productModel.findById(pid)

            if (productCollectionFound) {

                const productCartFound = cartFound.products.find(product => product.id_prod.toString() === pid)

                if (productCartFound) {

                    productCartFound.quantity += quantity
                    await cartFound.save()
                    res.status(200).send({ respuesta: 'OK', mensaje: cartFound.products })

                } else {
                    cartFound.products.push({ id_prod: pid, quantity: quantity })
                    await cartFound.save()
                    res.status(200).send({ respuesta: 'OK', mensaje: cartFound.products })
                }

            } else {
                res.status(404).send(`Product Not Found`)
            }

        } else {
            res.status(404).send(`Cart Not Found`)
        }

    } catch (e) {
        res.status(400).send({ error: e })
    }
})

routerCarts.get('/:cid', async (req, res) => { // Lista los productos del carrito

    const { cid } = req.params

    try {

        const cart = await cartModel.findById(cid)

        if (cart) {

            const products = cart.products

            if (products.length > 0) {
                res.status(200).send(products)
            } else {
                res.status(400).send("Cart empty")
            }

        } else {
            res.status(404).send(`Cart Not Found`)
        }
    } catch (error) {
        res.status(400).send(`Error checking carts: ${error}`)
    }
})

export default routerCarts