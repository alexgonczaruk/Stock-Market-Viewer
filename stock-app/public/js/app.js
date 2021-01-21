const stockForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const imageOne = document.querySelector('#image-1')

stockForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const stock = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    imageOne.src = ''

    fetch('/stock?symbol=' + stock).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                setTimeout(() => {
                    messageOne.textContent = data.title
                    messageTwo.textContent = data.price
                    messageThree.textContent = data.fluctuation
                    messageFour.textContent = data.time
                    imageOne.src = "../img/stockGraph.jpg"
                }, 5000)
            }
        })
    })
})