import { Router } from "express"

const routerSessions = Router()

routerSessions.get('/', async (req,res) => {
    
    res.send({status: true, datos: req.session })
})

routerSessions.put('/', async (req, res) => {
    req.session.error = ""
    res.status(200).send({data: "OK"})
})
 
routerSessions.delete('/', async (req,res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.status(200).send({ status:true, data: 'Login eliminado' })
})

export default routerSessions