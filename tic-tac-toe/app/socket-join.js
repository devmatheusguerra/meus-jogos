const socket = new WebSocket('ws://192.168.0.30:8080')
const code = prompt('Digite o código da sala')

socket.addEventListener('open', function (event) {
  socket.send(
    JSON.stringify({
      type: 'join',
      code
    })
  )

  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data)
    if (data.type == 'error'){
        alert("Código inválido!")
        window.location.href = "./index.html"
    }

    if (data.type == 'created') {
      document.querySelector('.code').innerText = data.code
    } else if (data.type == 'joined') {
      if (data.turn == 2) {
        document.querySelector('#turn').innerText = 'Sua vez!'
      } else {
        document.querySelector('#turn').innerText = 'Aguarde...'
      }
      document.querySelector('#status > .circle').classList.add('active')
      document.querySelector('#status > .txt').innerText = 'Jogador 1 conectado'
      document.querySelector('table').style.display = 'block'
    } else if (data.type == 'move') {
      render(data.board)
      if (data.turn == 2) {
        document.querySelector('#turn').innerText = 'Sua vez!'
      } else {
        document.querySelector('#turn').innerText = 'Aguarde...'
      }
    }
  })
})

function move (cell) {
  socket.send(
    JSON.stringify({
      code,
      type: 'move',
      cell
    })
  )
}
