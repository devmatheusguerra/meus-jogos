const table = document.querySelector('table')
const btn = document.querySelector('button')
const turn = document.querySelector('#turn')

const c1 = document.querySelector('#c1')
const c2 = document.querySelector('#c2')
const c3 = document.querySelector('#c3')

const c4 = document.querySelector('#c4')
const c5 = document.querySelector('#c5')
const c6 = document.querySelector('#c6')

const c7 = document.querySelector('#c7')
const c8 = document.querySelector('#c8')
const c9 = document.querySelector('#c9')

let letra_atual = location.pathname == '/socket-join.html' ? 'O' : 'X'
let winner = null
document.querySelectorAll('td').forEach(cell => {
  // Preenche a célula com a letra atual
  cell.addEventListener('click', _ => {
    if (winner) return

    if (cell.innerText == '') {
      move(cell.id)
    }
  })
})

function has_winner () {
  // Horizontal
  if (
    c1.innerText == c2.innerText &&
    c2.innerText == c3.innerText &&
    c1.innerText != ''
  ) {
    setTimeout(() => {
      c1.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c2.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c3.style.color = '#55ff55'
    }, 600)
    return c1.innerText
  }

  if (
    c4.innerText == c5.innerText &&
    c5.innerText == c6.innerText &&
    c4.innerText != ''
  ) {
    setTimeout(() => {
      c4.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c5.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c6.style.color = '#55ff55'
    }, 600)
    return c4.innerText
  }

  if (
    c7.innerText == c8.innerText &&
    c8.innerText == c9.innerText &&
    c7.innerText != ''
  ) {
    setTimeout(() => {
      c7.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c8.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c9.style.color = '#55ff55'
    }, 600)
    return c7.innerText
  }

  // Vertical
  if (
    c1.innerText == c4.innerText &&
    c4.innerText == c7.innerText &&
    c1.innerText != ''
  ) {
    setTimeout(() => {
      c1.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c4.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c7.style.color = '#55ff55'
    }, 600)
    return c1.innerText
  }

  if (
    c2.innerText == c5.innerText &&
    c5.innerText == c8.innerText &&
    c2.innerText != ''
  ) {
    setTimeout(() => {
      c2.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c5.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c8.style.color = '#55ff55'
    }, 600)
    return c2.innerText
  }

  if (
    c3.innerText == c6.innerText &&
    c6.innerText == c9.innerText &&
    c3.innerText != ''
  ) {
    setTimeout(() => {
      c3.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c6.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c9.style.color = '#55ff55'
    }, 600)
    return c3.innerText
  }

  // Diagonal
  if (
    c1.innerText == c5.innerText &&
    c5.innerText == c9.innerText &&
    c1.innerText != ''
  ) {
    setTimeout(() => {
      c1.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c5.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c9.style.color = '#55ff55'
    }, 600)
    return c1.innerText
  }

  if (
    c3.innerText == c5.innerText &&
    c5.innerText == c7.innerText &&
    c3.innerText != ''
  ) {
    setTimeout(() => {
      c3.style.color = '#55ff55'
    }, 200)
    setTimeout(() => {
      c5.style.color = '#55ff55'
    }, 400)
    setTimeout(() => {
      c7.style.color = '#55ff55'
    }, 600)
    return c3.innerText
  }

  return false
}

function has_draw () {
  let has_draw = true

  document.querySelectorAll('td').forEach(cell => {
    if (cell.innerText == '') has_draw = false
  })

  return has_draw
}

btn.addEventListener('click', _ => {
  location.href = './index.html'
})

function render (board) {
  let current_cell = 1
  document.querySelectorAll(`td`).forEach(cell => {
    cell.innerText = board[current_cell - 1]
    current_cell++
  })

  // Verifica se alguém ganhou
  if ((winner = has_winner())) {
    setTimeout(() => {
      table.style.opacity = 0
      setTimeout(() => {
        table.style.display = 'none'
        btn.disabled = false
        btn.style.opacity = 1
        turn.style.display = 'none'
      }, 100)
    }, 1000)

    return
  }

  // Verifica se deu velha
  if (has_draw()) {
    setTimeout(() => {
      table.style.opacity = 0
      setTimeout(() => {
        table.style.display = 'none'
        btn.disabled = false
        btn.style.opacity = 1
        turn.style.display = 'none'
      }, 100)
    }, 1000)

    return
  }
}
