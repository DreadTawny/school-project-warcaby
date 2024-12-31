document.addEventListener("dragover", event => {
    event.preventDefault()
})
document.addEventListener("drop", event => {
    let data = event.dataTransfer.getData("text/html")
    data = JSON.parse(data)
    if(validateMovement(event.target.id, data[1])) {
        event.target.appendChild(game.pawns[data[0]])
    socket.emit("turnEnd", {map: JSON.stringify(game.boardMap), player: game.player, room: room})
    game.gameWin()
    endTurn()
    }
})

function validateMovement(targetNodeID, parentNodeID) {
    console.log(targetNodeID, parentNodeID)
    let targetRowID = targetNodeID.slice(0,1)
    let parentRowID= parentNodeID.slice(0,1)
    // 
    if(!targetRowID || game.boardMap[targetRowID][targetNodeID].state === -1 || game.boardMap[targetRowID][targetNodeID].state === 1 || game.boardMap[targetRowID][targetNodeID].state === 2 ) return false
     if ((game.boardMap[parentRowID].row - game.boardMap[targetRowID].row !== 1) ) {
              if ( game.boardMap[parentRowID].row - game.boardMap[targetRowID].row !== -1  ) {
                  if(validateStrike(targetNodeID, parentNodeID, targetRowID, parentRowID)) {
                    console.log("test")
                  }
                  else  return false
              }
           }
    
    game.boardMap[targetRowID][targetNodeID].state = game.boardMap[parentRowID][parentNodeID].state 
    game.boardMap[parentRowID][parentNodeID].state = 0

    return true
}
function validateStrike(targetNodeID, parentNodeID, targetRowID, parentRowID) { 
    let forwardValidation = game.boardMap[parentRowID].row - game.boardMap[targetRowID].row === 2
    let backwardsValidation = game.boardMap[parentRowID].row - game.boardMap[targetRowID].row === -2
    if( forwardValidation || backwardsValidation ) {
        console.log("First validation test")
        if(game.boardMap[parentRowID][parentNodeID].col - game.boardMap[targetRowID][targetNodeID].col !== 2) {
            if(game.boardMap[parentRowID][parentNodeID].col - game.boardMap[targetRowID][targetNodeID].col !== -2) return false
        }
            if(forwardValidation) {
                console.log("second validation")
                let nextRowIndex = game.rows.indexOf(parentRowID) - 1
                let nextRow = game.rows[nextRowIndex]
                if(game.boardMap[parentRowID][parentNodeID].col - game.boardMap[targetRowID][targetNodeID].col === -2) {
                    let nextCol = Number(parentNodeID.slice(1,2)) +1
                    console.log(nextRow+nextCol)
                    if(game.boardMap[nextRow][nextRow+nextCol].state !== game.boardMap[parentRowID][parentNodeID].state && game.boardMap[nextRow][nextRow+nextCol].state !== 0 && game.boardMap[nextRow][nextRow+nextCol].state !== -1) {
                        game.boardMap[nextRow][nextRow+nextCol].state = 0
                        return true
                    }
                    else return false  
                }
                else {
                    let nextCol = Number(parentNodeID.slice(1,2)) -1
                    console.log(nextRow+nextCol)
                    if(game.boardMap[nextRow][nextRow+nextCol].state !== game.boardMap[parentRowID][parentNodeID].state && game.boardMap[nextRow][nextRow+nextCol].state !== 0 && game.boardMap[nextRow][nextRow+nextCol].state !== -1) {
                        game.boardMap[nextRow][nextRow+nextCol].state = 0
                        return true
                    }
                    else return false
                }
                   
            }
            else {
                console.log("Else, second validation")
                let nextRowIndex = game.rows.indexOf(parentRowID) +1
                let nextRow = game.rows[nextRowIndex]
                if(game.boardMap[parentRowID][parentNodeID].col - game.boardMap[targetRowID][targetNodeID].col === -2) {
                    let nextCol = Number(parentNodeID.slice(1,2)) +1
                    console.log(nextRow+nextCol)
                    if(game.boardMap[nextRow][nextRow+nextCol].state !== game.boardMap[parentRowID][parentNodeID].state && game.boardMap[nextRow][nextRow+nextCol].state !== 0 && game.boardMap[nextRow][nextRow+nextCol].state !== -1 ) {
                        game.boardMap[nextRow][nextRow+nextCol].state = 0
                        return true
                    }
                    else return false  
                }
                else {
                    let nextCol = Number(parentNodeID.slice(1,2)) -1
                    console.log(nextRow+nextCol)
                    if(game.boardMap[nextRow][nextRow+nextCol].state !== game.boardMap[parentRowID][parentNodeID].state && game.boardMap[nextRow][nextRow+nextCol].state !== 0 && game.boardMap[nextRow][nextRow+nextCol].state !== -1) {
                        game.boardMap[nextRow][nextRow+nextCol].state = 0
                        return true
                    }
                    else return false
                }
            }
            
        
    }

}
function endTurn() {
    for(let i = 0; i < game.pawns.length; i++) {
        game.pawns[i].setAttribute("draggable", "false")
    }
}

