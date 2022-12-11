import websockets
import asyncio
from json import loads, dumps
from random import randint
from time import time
games = {}

async def serve(websocket, path):
    while True:
        data = loads(await websocket.recv())
        if data['type'] == 'create':

            games[data['code']] = {
                'player1': websocket,
                'player2': None,
                'turn': randint(1, 2),
                'board': ['', '', '', '', '', '', '', '', ''],
                'time': time()
            }
            
            await websocket.send(dumps({'type': 'created', 'code': data['code']}))
        
        elif data['type'] == 'join':
            if data['code'] not in games:
                await websocket.send(dumps({'type': 'error', 'message': 'Game not found'}))
                continue

            games[data['code']]['player2'] = websocket

            await games[data['code']]['player1'].send(dumps({'type': 'joined', 'turn': games[data['code']]['turn']}))
            await games[data['code']]['player2'].send(dumps({'type': 'joined', 'turn': games[data['code']]['turn']}))

        elif data['type'] == 'move':
            if data['code'] not in games:
                await websocket.send(dumps({'type': 'error', 'message': 'Game not found'}))
                continue
            
            if games[data['code']]['turn'] == 1 and games[data['code']]['player1'] == websocket:
                position = int(data['cell'][1]) - 1
                games[data['code']]['board'][position] = 'X'
                games[data['code']]['turn'] = 2

            elif games[data['code']]['turn'] == 2 and games[data['code']]['player2'] == websocket:
                position = int(data['cell'][1]) - 1
                games[data['code']]['board'][position] = 'O'
                games[data['code']]['turn'] = 1

            await games[data['code']]['player1'].send(dumps({'type':'move','board': games[data['code']]['board'], 'turn': games[data['code']]['turn']}))
            await games[data['code']]['player2'].send(dumps({'type':'move','board': games[data['code']]['board'], 'turn': games[data['code']]['turn']}))


start_server = websockets.serve(serve, "192.168.0.30", 8080)

# Keep connection alive
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


