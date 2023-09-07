import messageModel from "../models/messages.models.js"


export const conexionIO = (io) => {

    //Conexion de Socket.io

    io.on("connection", async (socket) => {
        console.log("Connection with socket.io established")

        socket.on('getMessages', async request => {

            try {

                let messages = await messageModel.find().sort({ _id: -1 }).limit(10)

                messages.reverse()

                io.emit('responseGetMessages', { status: true, data: messages })

            } catch (error) {

                io.emit('responseGetMessages', { status: false, error: error })
            }

        })

        socket.on('createMessage', async data => {

            try {

                let message = await messageModel.create(data)

                socket.emit('responseCreateMessage', { status: true })

            } catch (error) {

                socket.emit('responseCreateMessage', { status: false, error: error })
            }
        })
    })
}