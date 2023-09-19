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
            console.log("Email: " + data.datos.email)
            console.log("Error: " + data.datos.error)
            userData(data.datos.email, PORT)
        })
        .catch(error => console.log(error))
}

const userData = (userEmail, PORT) => {

    const greeting = document.getElementById("greeting")
    const user = document.getElementById("user")
    const email = document.getElementById("email")
    const age = document.getElementById("age")

    fetch(`http://localhost:${PORT}/api/users/${userEmail}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            greeting.innerHTML = `Bienvenido ${data.user.first_name}`
            user.innerHTML = `Usuario: ${data.user.first_name} ${data.user.last_name}`
            email.innerHTML = `Email: ${data.user.email}`
            age.innerHTML = `Edad: ${data.user.age}`

            const productsButton = document.getElementById("productsButton")

            productsButton.innerHTML = ` <a href="http://localhost:${PORT}/static/products"><button>Productos</button></a> `

            const logout = document.getElementById("logout")

            logout.addEventListener("click", async () => {

                fetch(`http://localhost:${PORT}/api/sessions`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        window.location.reload()
                    })
                    .catch(error => console.log(error))
            })
        })
        .catch(error => console.log(error))
}