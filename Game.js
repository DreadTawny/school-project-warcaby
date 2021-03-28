// actual game here 

class Board {
    constructor(player) {
        this.gameState = "start"
        this.player = player
        if(this.gameState == "start") this.gameStart()
    }
    gameState
    boardMap = {
        A: {
            A1: {state:-1}, A2: {state:1, equiv: document.getElementById("A2")}, A3: {state:-1}, A4: {state:1, equiv: document.getElementById("A4")}, A5: -1, A6: {state:1, equiv: document.getElementById("A6")}, A7: {state:-1}, A8: {state:1, equiv: document.getElementById("A8")}
        },
        B: {
            B1: {state:1, equiv: document.getElementById("B1")}, B2: {state:-1}, B3: {state:1, equiv:document.getElementById("B3")}, B4: {state:-1}, B5: {state: 1, equiv: document.getElementById("B5")}, B6: {state:-1}, B7: {state:1, equiv: document.getElementById("B7")}, B8: {state:-1}
        },
        C: {
            C1: {state:-1}, C2: {state:1, equiv: document.getElementById("C2")}, C3: {state:-1}, C4: {state:1, equiv: document.getElementById("C4")}, C5: -{state:1}, C6: {state:1, equiv: document.getElementById("C6")}, C7: {state:-1}, C8: {state:1, equiv: document.getElementById("C8")}
        },
        D: {
            D1: {state:0, equiv: document.getElementById("D1")}, D2: {state:-1}, D3: {state:0, equiv: document.getElementById("D3")}, D4: {state:-1}, D5: {state:0, equiv: document.getElementById("D5")}, D6: {state:-1}, D7: {state:0, equiv:document.getElementById("D7")}, D8: {state:-1}
        },
        E: {
            E1: {state:-1}, E2: {state:0, equiv: document.getElementById("E2")}, E3: {state:-1}, E4: {state:0, equiv:document.getElementById("E4")}, E5: {state:-1}, E6: {state:0, equiv: document.getElementById("E6")}, E7: {state:-1}, E8: {state:0, equiv: document.getElementById("E8")}
        },
        F: {
            F1: {state:2, equiv: document.getElementById("F1")}, F2: {state:-1}, F3: {state:2, equiv: document.getElementById("F3")}, F4: {state:-1}, F5: {state:2, equiv: document.getElementById("F5")}, F6: {state:-1}, F7: {state:2, equiv: document.getElementById("F7")}, F8: {state:-1}
        },
        G: {
            G1: {state:-1}, G2: {state:2, equiv: document.getElementById("G2")}, G3: {state:-1}, G4: {state:2, equiv: document.getElementById("G4")}, G5: {state:-1}, G6: {state:2, equiv: document.getElementById("G6")}, G7: {state:-1}, G8: {state: 2, equiv: document.getElementById("G8")}
        },
        H: {
            H1: {state:2, equiv: document.getElementById("H1")}, H2: {state:-1}, H3: {state:2, equiv: document.getElementById("H3")}, H4: {state:-1}, H5: {state:2, equiv: document.getElementById("H5")}, H6: {state:-1}, H7: {state:2, equiv: document.getElementById("H7")}, H8: {state:-1}
        }
    }
    player
    gameWon () {

    }
    gameStart() {
        if(this.player === "white") {

            for(let row in this.boardMap){
                for(let field in this.boardMap[row]){
                   let gameField = this.boardMap[row][field]
                    let pawnWhite = document.createElement("div")
                    pawnWhite.setAttribute("class", "pawn-white")
                    let pawnBlack = document.createElement("div")
                    pawnBlack.setAttribute("class", "pawn-black")
                    if(gameField.state === 1) {
                        pawnWhite.setAttribute("draggable", "true")
                        pawnWhite.addEventListener("drag", event => {
                            console.log(event.target)
                        })
                        pawnWhite.addEventListener("dragover", event => {
                            event.preventDefault()
                        })
                        gameField.equiv.appendChild(pawnWhite)
                        console.log("TEST")
                    }
                    if(gameField.state === 2) {
                        gameField.equiv.appendChild(pawnBlack)
                    }
                }
            }
        }
        else {
            for(let row in this.boardMap){
                for(let field in this.boardMap[row]){
                    let gameField = this.boardMap[row][field]
                    let pawnWhite = document.createElement("div")
                    pawnWhite.setAttribute("class", "pawn-white")
                    let pawnBlack = document.createElement("div")
                    pawnBlack.setAttribute("class", "pawn-black")
                    console.log(gameField)
                    if( gameField.state === 2) {
                        gameField.equiv.appendChild(pawnWhite)
                    }
                    if( gameField.state === 1) {
                        pawnBlack.setAttribute("draggable", "true")
                        gameField.equiv.appendChild(pawnBlack)
                    }
                }
            }
        }
    }
    gameInProgress() {

    }
}

let game = new Board("white")