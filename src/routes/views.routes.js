import { Router } from "express"

const routerViews = Router()

routerViews.get('/chat', async (req, res) =>{ // Vista de los mensajes
    res.status(200).render('chat', {
        script: "chat",
        title: "Chat",
        css: "chat"
    })
})

export default routerViews