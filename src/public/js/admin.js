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

const app = async (PORT) => {

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

    const productsButton = document.getElementById("productsButton")

    productsButton.innerHTML = ` <a href="http://localhost:${PORT}/static/products"><button>Productos</button></a> `
}


