const socket = io()

await socket.emit("port", "")
await socket.on("responsePort", response => {

    try {
        if (response.status) {
            app(response.data)
        } else {
            console.log(response.error)
        }
    } catch (error) {
        console.log(error)
    }
})

const app = async (port) => {
    const PORT = port

    fetch(`http://localhost:${PORT}/api/sessions`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("Login: " + data.datos.login)
            console.log("Error: " + data.datos.error)

            if(data.datos.error){
                messageError(data.datos.error)
            }

        })
        .catch(error => console.log(error))
}

const messageError = (error) => {

    const message = document.getElementById("message")
    message.innerHTML= error

}





// const socket = io()
// const formLogin = document.getElementById("formLogin")

// formLogin.addEventListener('submit', async(e) => {
//     e.preventDefault()

//     let datForm = new FormData(e.target)
//     let user = Object.fromEntries(datForm)
//     let message = document.getElementById("message")

// //     await socket.emit('login', user)

// await socket.on('responseLogin', async (data) => {

//     if (data.status) {
//         document.getElementById("formLogin").reset()
//         console.log("Usuario Conectado")
//         console.log(user)
//         message.innerHTML = ""
//         message.innerHTML = "Usuario conectado"
//     } else {
//         console.log("Fallo al conectarse")
//         console.log(data.error)
//         message.innerHTML = ""
//         message.innerHTML = data.error
//     }
// })
// })