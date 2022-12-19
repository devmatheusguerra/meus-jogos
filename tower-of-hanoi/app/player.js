const dict = {
  disk1: document.querySelector('.c6'),
  disk2: document.querySelector('.c5'),
  disk3: document.querySelector('.c4'),
  disk4: document.querySelector('.c3'),
  disk5: document.querySelector('.c2'),
  disk6: document.querySelector('.c1')
}

let moves = []

function TowerOfHanoi (n, source, destination, auxiliary) {
  if (n == 1) {
    console.log(
      'Move disk 1 from source',
      source,
      'to destination',
      destination
    )
    moves.push([dict['disk1'], source, destination])
    return
  }
  TowerOfHanoi(n - 1, source, auxiliary, destination)
  console.log(
    'Move disk',
    n,
    'from source',
    source,
    'to destination',
    destination
  )
  moves.push([dict['disk' + n], source, destination])
  TowerOfHanoi(n - 1, auxiliary, destination, source)
}

n = 6
TowerOfHanoi(n, 'A', 'B', 'C')

setTimeout(() => {
    idx = 0
    setInterval(() => {
        console.log('teste')
        moves[idx][0].style.left = `${moves[idx][2] === 'A' ? '22.5%' : moves[idx][2] === 'B' ? '50.5%' : '72.5%'}`
        idx += 1

        if(idx === moves.length) clearInterval(this)
    }, 1000);    
    

}, 3000)
