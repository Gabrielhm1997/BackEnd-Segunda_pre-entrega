import { Router } from "express"
import userModel from "../models/users.models.js"

const routerUsers = Router()

routerUsers.get('/:email', async (req, res) => {

    const { email } = req.params

    try {
        const user = await userModel.findOne({ email: email }) //Retorna el objeto o null
        if (user) {
            res.status(200).send({ status: true, user: user })
        } else {
            res.status(404).send({ status: false, error: `Not Found` })
        }
    } catch (error) {
        res.status(400).send({ status: false, error: `Error checking user: ${error}` })
    }
})

routerUsers.post('/', async (req, res) => {

    const { first_name, last_name, email, password, age } = req.body

    if(email === "admin@admin.com"){
        res.status(400).send({ status: false, error: `Error on create user: invalid email` })
    } else {
        try {
            const response = await userModel.create({ first_name, last_name, email, password, age })
            req.session.login = true
            req.session.email = email
            res.status(200).send({ status: true, respuesta: response })
        } catch (error) {
            res.status(400).send({ status: false, error: `Error on create user: ${error}` })
        }
    }
})

export default routerUsers