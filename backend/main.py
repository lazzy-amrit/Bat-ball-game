from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Room structure:
# {
#   "ROOMCODE": {
#       "players": [ws1, ws2],
#       "ready": {ws1: bool, ws2: bool},
#       "choices": {ws1: int, ws2: int},
#       "scores": {ws1: int, ws2: int}
#   }
# }

rooms = {}


@app.websocket("/ws/{room_code}")
async def websocket_endpoint(websocket: WebSocket, room_code: str):
    await websocket.accept()

    if room_code not in rooms:
        rooms[room_code] = {
            "players": [],
            "ready": {},
            "choices": {},
            "scores": {}
        }

    room = rooms[room_code]

    # Only 2 players allowed
    if len(room["players"]) >= 2:
        await websocket.send_json({"type": "room_full"})
        await websocket.close()
        return

    room["players"].append(websocket)
    room["ready"][websocket] = False
    room["scores"][websocket] = 0

    await broadcast(room_code, {
        "type": "room_update",
        "players": len(room["players"])
    })

    try:
        while True:
            data = await websocket.receive_json()

            # READY SYSTEM
            if data["type"] == "ready":
                room["ready"][websocket] = True

                await broadcast(room_code, {
                    "type": "ready_update",
                    "ready_count": sum(room["ready"].values())
                })

                if sum(room["ready"].values()) == 2:
                    await broadcast(room_code, {
                        "type": "start_game"
                    })

            # PLAYER CHOICE
            if data["type"] == "choice":
                room["choices"][websocket] = data["value"]

                if len(room["choices"]) == 2:
                    players = list(room["choices"].keys())
                    p1, p2 = players[0], players[1]

                    val1 = room["choices"][p1]
                    val2 = room["choices"][p2]

                    out = val1 == val2

                    if not out:
                        room["scores"][p1] += val1
                        room["scores"][p2] += val2

                    await broadcast(room_code, {
                        "type": "round_result",
                        "p1": val1,
                        "p2": val2,
                        "out": out,
                        "score1": room["scores"][p1],
                        "score2": room["scores"][p2]
                    })

                    room["choices"] = {}

    except WebSocketDisconnect:
        room["players"].remove(websocket)
        del room["ready"][websocket]
        del room["scores"][websocket]

        await broadcast(room_code, {
            "type": "room_update",
            "players": len(room["players"])
        })


async def broadcast(room_code, message):
    for connection in rooms[room_code]["players"]:
        await connection.send_json(message)
