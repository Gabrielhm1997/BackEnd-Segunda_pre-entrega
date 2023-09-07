const socket = io()

const getMessagesIO = async () => { //Pide los mensajes de la base de datos mediante Socket.io

    socket.emit("getMessages", "")

    socket.on("responseGetMessages", response => { // Devolucion de los ultimos 10 mensajes enviados

        if (response.status) {

            parrafosMensajes.innerHTML = ""
            response.data.forEach(message => {
                parrafosMensajes.innerHTML += `<p>${message.email} : ${message.message}</p>`
            })

        } else {
            console.log(response.error)
        }
    })
}


const botonChat = document.getElementById('botonChat')
const parrafosMensajes = document.getElementById('parrafosMensajes')
const valInput = document.getElementById('chatBox')
let user

Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su Email",
    input: "text",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un nombre de usuario valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
    getMessagesIO()
})

botonChat.addEventListener('click', () => {

    if (valInput.value.trim().length > 0) {
        socket.emit('createMessage', { email: user, message: valInput.value })
        valInput.value = ""
        socket.on('responseCreateMessage', response => {

            if (response.status) {

               getMessagesIO()

            } else {

                console.log(response.error)
            }
        })
    }
})