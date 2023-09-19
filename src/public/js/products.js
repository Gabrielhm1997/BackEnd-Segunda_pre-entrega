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

let admin = ""
await socket.emit("admin", "")
await socket.on("responseAdmin", response => {

    try {
        if (response.status) {
            admin = response.data
            console.log(admin)
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
            console.log("Email: " + data.datos.email)
            console.log("Error: " + data.datos.error)
            userData(data.datos.email, PORT)
        })
        .catch(error => console.log(error))
}

const userData = async (userEmail, PORT) => {

    const greeting = document.getElementById("greeting")
    const specialButton = document.getElementById("specialButton")
   

    if (userEmail == admin) {
        greeting.innerHTML = `Bienvenido Admin`
        specialButton.innerHTML = ` <a href="http://localhost:${PORT}/static/admin"><button> Admin </button></a> `

    } else {
        fetch(`http://localhost:${PORT}/api/users/${userEmail}`)
            .then(res => res.json())
            .then(data => {
                greeting.innerHTML = `Bienvenido ${data.user.first_name}`
                specialButton.innerHTML = ` <a href="http://localhost:${PORT}/static/profile"><button> Perfil</button></a> `
            })
            .catch(error => console.log(error))
    }
}