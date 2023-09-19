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

const app = (PORT) => {

    const formRegister = document.getElementById("formRegister")

    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault()

        let datForm = new FormData(e.target)
        let newUser = Object.fromEntries(datForm)

        fetch(`http://localhost:${PORT}/api/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                //"Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify( newUser )
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.reload()
            })
            .catch(error => console.log(error))
    })
}





// const socket = io()

// const formRegister = document.getElementById("formRegister")

// formRegister.addEventListener('submit', async(e) => {
//     e.preventDefault()

//     let datForm = new FormData(e.target)
//     let user = Object.fromEntries(datForm)

//     await socket.emit('newUser', user)

//     await socket.on('responseNewUser', async (data) => {

//         if(data.status){
//             document.getElementById("formRegister").reset()
//             console.log("Usuario Registrado")
//             console.log(user)
//         } else {
//             console.log("Fallo al registrar usuario")
//             console.log(data.error)
//         }
//     })
// })