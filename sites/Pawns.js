document.addEventListener("dragover", event => {
    event.preventDefault()
})
document.addEventListener("drop", event => {
    let data = event.dataTransfer.getData("text/html")
    data = JSON.parse(data)
    if(validateMovement(event.target.id, data[1])) event.target.appendChild(game.pawns[data[0]])
    socket.emit("turnEnd", {map: JSON.stringify(game.boardMap), player: game.player, room: room})
    endTurn()
})

function validateMovement(targetNodeID, parentNodeID) {
    console.log(targetNodeID, parentNodeID)
    let targetRowID = targetNodeID.slice(0,1)
    let parentRowID= parentNodeID.slice(0,1)
    // 
    if(!targetRowID || game.boardMap[targetRowID][targetNodeID].state === -1 || game.boardMap[targetRowID][targetNodeID].state === 1 || game.boardMap[targetRowID][targetNodeID].state === 2 ) return false
     if ((game.boardMap[parentRowID].row - game.boardMap[targetRowID].row !== 1) ) {
         validateStrike()
              if ( game.boardMap[parentRowID].row - game.boardMap[targetRowID].row !== -1  ) {
                return false
              }
           }
    
    game.boardMap[targetRowID][targetNodeID].state = game.boardMap[parentRowID][parentNodeID].state 
    game.boardMap[parentRowID][parentNodeID].state = 0

    return true
}
function validateStrike() {

}
function endTurn() {
    for(let i = 0; i < game.pawns.length; i++) {
        game.pawns[i].setAttribute("draggable", "false")
    }
}

