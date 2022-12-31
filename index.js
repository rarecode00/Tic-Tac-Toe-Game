if(window.performance.getEntriesByType("navigation")[0].type === 'reload'){
    sessionStorage.clear()
}
if(!sessionStorage.getItem('player1')) parent.location = '/start.html'

document.getElementById('player-1').innerText = sessionStorage.getItem('player1') + " (X):"
document.getElementById('player-2').innerText = sessionStorage.getItem('player2') + " (O):"

let arr = new Array(3);     
for(let i = 0 ; i < 3; i++){
    arr[i] = new Array(3);
}

let turn = true;
let count = 0;
let winA = 0 , winB = 0;

document.addEventListener('click' , function(e){

    e = e || window.event;

    // If targeting div is differnt then return from there
    if(!e.target.classList.contains('spot')) return;

    // ROW and COLUMN for placing the characters
    let row = e.target.getAttribute('row');
    let col = e.target.getAttribute('col');

    if(arr[row][col] === 'X' || arr[row][col] === 'O') return;

   // Set char at row and col.
    let value;
    if(turn) value = 'X';
    else value = 'O';
    arr[row][col] = value;
    e.target.innerText = value;
    turn = !turn;
    count++;
    checkCondition();
})



function checkCondition(){
    let win = false
    if(arr[0][0] === arr[0][1] && arr[0][1] === arr[0][2] && (arr[0][0] === 'X' || arr[0][0] === 'O')){ // First row
        win = true;
    }else if(arr[1][0] === arr[1][1] && arr[1][1] === arr[1][2] && (arr[1][0] === 'X' || arr[1][0] === 'O')){ // Second row
        win = true;
    }else if(arr[2][0] === arr[2][1] && arr[2][1] === arr[2][2] && (arr[2][0] === 'X' || arr[2][0] === 'O')){ // thrid row
        win = true;
    }else if(arr[0][0] === arr[1][0] && arr[1][0] === arr[2][0] && (arr[2][0] === 'X' || arr[2][0] === 'O')){ // First column
        win = true;
    }else if(arr[0][1] === arr[1][1] && arr[1][1] === arr[2][1] && (arr[0][1] === 'X' || arr[0][1] === 'O')){ // second column
        win = true;
    }else if(arr[0][2] === arr[1][2] && arr[1][2] === arr[2][2] && (arr[2][2] === 'X' || arr[2][2] === 'O')){ // thrid column
        win = true;
    }else if(arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && (arr[0][0] === 'X' || arr[0][0] === 'O')){ // upper-left-diagonal
        win = true;
    }else if(arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0] && (arr[0][2] === 'X' || arr[0][2] === 'O')){ // upper-right-diagonal
        win = true;
    }

    if(win || count == 9){
        for(let i = 0; i < 3; i++){
            arr[i] = new Array(3);
        }
        $('.spot').empty()
        $('#Launch').click()
        if(count === 9){
            document.getElementById('body').innerText = "Oops no one win :O !"
            turn = true;
            count = 0;
            return;
        }
        document.getElementById('body').innerText = turn ?  sessionStorage.getItem('player2') + " Wins!" : sessionStorage.getItem('player1') + " Wins!";
        if(turn) winB++;
        else winA++;
        document.getElementById('score1').innerText = winA
        document.getElementById('score2').innerText = winB
        count = 0;
        turn = true;
    }

}

document.getElementById('play-again').onclick = function(){
    for(let i = 0; i < 3; i++){
        arr[i] = new Array(3);
    }
    $('.spot').empty()
}

document.getElementById('restart').onclick = function(){
    sessionStorage.clear()
    parent.location = '/start.html'
}