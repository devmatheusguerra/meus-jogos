const socket = new WebSocket('ws://192.168.0.30:8080');
const code = Math.random().toString(16).substring(2, 6).toUpperCase();


socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({
        type: 'create',
        code
    }));

    socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);

        if (data.type == 'opponent-left') {
            console.log(data);
            document.querySelector('#status > .circle').classList.add('inactive');
            document.querySelector('#turn').innerText = 'Oponente saiu!';
        }


        if (data.type == 'created') {
            document.querySelector('.code').innerText = data.code;
        }else if(data.type == 'joined'){
            if(data.turn == 1)
            {
                document.querySelector('#turn').innerText = 'Sua vez!';
            }else{
                document.querySelector('#turn').innerText = 'Aguarde...';
            }
            document.querySelector('#status > .circle').classList.add('active');
            document.querySelector('#status > .txt').innerText = 'Jogador 2 conectado';
            document.querySelector('table').style.display = 'block';
        }else if(data.type == 'move'){
            render(data.board);
            if(data.turn == 1)
            {
                document.querySelector('#turn').innerText = 'Sua vez!';
            }else{
                document.querySelector('#turn').innerText = 'Aguarde...';
            }
        }
    });
});


function move(cell){
    socket.send(JSON.stringify({
        code,
        type: 'move',
        cell
    }));
}