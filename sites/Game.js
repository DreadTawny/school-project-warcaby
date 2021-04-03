// actual game here 

class Board {
    constructor(player) {
        this.player = player
        this.gameStart()
    }
    boardMap = {
        A: {
            A1: {state:-1}, A2: {state:1, equiv: "A2"}, A3: {state:-1}, A4: {state:1, equiv: "A4"}, A5: -1, A6: {state:1, equiv: "A6"}, A7: {state:-1}, A8: {state:1, equiv: "A8"}, row: 1
        },
        B: {
            B1: {state:1, equiv: "B1"}, B2: {state:-1}, B3: {state:1, equiv:"B3"}, B4: {state:-1}, B5: {state: 1, equiv: "B5"}, B6: {state:-1}, B7: {state:1, equiv: "B7"}, B8: {state:-1}, row: 2
        },
        C: {
            C1: {state:-1}, C2: {state:1, equiv: "C2"}, C3: {state:-1}, C4: {state:1, equiv: "C4"}, C5: {state:-1}, C6: {state:1, equiv: "C6"}, C7: {state:-1}, C8: {state:1, equiv: "C8"}, row: 3
        },
        D: {
            D1: {state:0, equiv: "D1"}, D2: {state:-1}, D3: {state:0, equiv: "D3"}, D4: {state:-1}, D5: {state:0, equiv: "D5"}, D6: {state:-1}, D7: {state:0, equiv:"D7"}, D8: {state:-1}, row: 4
        },
        E: {
            E1: {state:-1}, E2: {state:0, equiv: "E2"}, E3: {state:-1}, E4: {state:0, equiv:"E4"}, E5: {state:-1}, E6: {state:0, equiv: "E6"}, E7: {state:-1}, E8: {state:0, equiv: "E8"}, row: 5
        },
        F: {
            F1: {state:2, equiv: "F1"}, F2: {state:-1}, F3: {state:2, equiv: "F3"}, F4: {state:-1}, F5: {state:2, equiv: "F5"}, F6: {state:-1}, F7: {state:2, equiv: "F7"}, F8: {state:-1}, row: 6
        },
        G: {
            G1: {state:-1}, G2: {state:2, equiv: "G2"}, G3: {state:-1}, G4: {state:2, equiv: "G4"}, G5: {state:-1}, G6: {state:2, equiv: "G6"}, G7: {state:-1}, G8: {state: 2, equiv: "G8"}, row: 7
        },
        H: {
            H1: {state:2, equiv: "H1"}, H2: {state:-1}, H3: {state:2, equiv: "H3"}, H4: {state:-1}, H5: {state:2, equiv: "H5"}, H6: {state:-1}, H7: {state:2, equiv: "H7"}, H8: {state:-1}, row: 8
        }
    }
    player
    turn
    moves
    gameStart(playerTurn) {
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
                        document.getElementById(gameField.equiv).appendChild(pawnWhite)
                    }
                    if(gameField.state === 2) {
                        pawnBlack.addEventListener("dragstart", event => event.preventDefault())
                        document.getElementById(gameField.equiv).appendChild(pawnBlack)
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
                    if( gameField.state === 1) {
                        pawnWhite.addEventListener("dragstart", event => event.preventDefault())
                        document.getElementById(gameField.equiv).appendChild(pawnWhite)
                    }
                    if( gameField.state === 2) {
                        document.getElementById(gameField.equiv).appendChild(pawnBlack)
                    }
                }
            }
        }
        if(playerTurn) {
            if(playerTurn === "white" && this.player === "white") {
                
                let pawnsWhite = document.querySelectorAll(".pawn-white")
                for(let i = 0; i < pawnsWhite.length; i++) {
                    pawnsWhite[i].setAttribute("draggable", "true")
                }
            }
            else if(playerTurn ==="black" && this.player ==="black") {
                let pawnsBlack = document.querySelectorAll(".pawn-black")
                for(let i = 0; i < pawnsBlack.length; i++) {
                    pawnsBlack[i].setAttribute("draggable", "true")
                }
        }
    }
    this.handlePawns()
    }
    handlePawns() {
        let pawns = document.querySelectorAll(".pawn-white, .pawn-black")
        this.pawns = pawns
        for(let i = 0; i < pawns.length; i++) {
            pawns[i].addEventListener("dragstart", event => {
                let startOfMovement = event.target.parentNode.id
                let dataTransfer = [i, startOfMovement]
                console.log(dataTransfer)
                event.dataTransfer.setData("text/html", JSON.stringify(dataTransfer))
                event.stopPropagation()
    })
}
    }
    clearBoard() {
        for(let row in this.boardMap){
            for(let field in this.boardMap[row]) {
                let gameField = this.boardMap[row][field]
                if( gameField.state === 1 || gameField.state === 0 || gameField.state === 2){
                    let nested = document.getElementById(gameField.equiv).children 
                    if(nested.length === 1) document.getElementById(gameField.equiv).removeChild(nested[0])
                }
                
            }
        }
    }
}

