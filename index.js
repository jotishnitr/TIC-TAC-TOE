let player1Name=document.getElementById("name1")
let player2Name=document.getElementById("name2")
let playerMove=document.getElementById("playerMove")
let alertMsg=document.getElementById("alert")
let newGame=document.getElementById("new-game")
let submitBtn=document.getElementById("submit-btn")
let Xpoints=document.getElementById("X-points")
let Opoints=document.getElementById("O-points")
let drawpoints=document.getElementById("draw")
let player1=document.getElementById("player1")
let player2=document.getElementById("player2")

let boxes=document.querySelectorAll(".box")
let gameOver=false
let XPoints=0;
let OPoints=0;
let drawPoints=0;

submitBtn.addEventListener("click",function(){
  if(player1Name.value.trim()==="" || player2Name.value.trim()===""){
    alertMsg.innerText="Please enter valid player names"
  }
  else{
    player1.textContent="X-"+player1Name.value
    player2.textContent="O-"+player2Name.value
    alertMsg.innerText=""
    player1Name.value=""
    player2Name.value=""
    boxes.forEach((box) => {
      box.innerText=""
    })
    XPoints=0;
    OPoints=0;
    drawPoints=0;
    Xpoints.innerText="X wins:"
    Opoints.innerText="• O wins:"
    drawpoints.innerText="• Draws:"
  }
  
  
  
})

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

let isXTurn=true;
let xStarts=true;

boxes.forEach((box) => {
  box.addEventListener("click",function(){
    if(gameOver){
      return;
    }
    if(box.innerText==""){
      if(isXTurn){
        box.classList.add('symbolX')
        box.innerText="X"
        isXTurn=false;
        playerMove.innerText="O — your move"
        player2.classList.add("player-2")
        player1.classList.remove("player-1")
      }
      else{
        box.classList.add('symbolO')
        box.innerText="O"
        isXTurn=true;
        playerMove.innerText="X — your move"
        player1.classList.add("player-1")
        player2.classList.remove("player-2")
      }
      decision();

    }
    
  })
})

function decision(){
  for(let combination of winningCombinations){
    let pos1=boxes[combination[0]].innerText
    let pos2=boxes[combination[1]].innerText
    let pos3=boxes[combination[2]].innerText
    let isDraw=true;
    if(pos1==="X" && pos2==="X" && pos3==="X"){
      playerMove.classList.add("winner")
      playerMove.innerText="✦Player 1 wins!"
      XPoints+=1;
      Xpoints.innerText="X wins:"+XPoints
      gameOver=true;
      combination.forEach(idx => boxes[idx].classList.add('winning-cell'));
      player1.classList.remove("player-1");
      player2.classList.remove("player-2");
      return;      
    }
    else if(pos1==="O" && pos2==="O" && pos3==="O"){
      playerMove.classList.add("winner")
      playerMove.innerText="✦Player 2 wins!"
      OPoints+=1;
      Opoints.innerText="• O wins:"+OPoints
      gameOver=true;
      combination.forEach(idx => boxes[idx].classList.add('winning-cell'));
      player1.classList.remove("player-1");
      player2.classList.remove("player-2");
      return;
    }
    
  }
  checkDraw();

}

function checkDraw(){
  let isDraw = true;
  boxes.forEach((box) => {
    if(box.innerText === ""){
      isDraw = false;
    }
  });

  if(isDraw){
    playerMove.classList.add("winner");
    playerMove.innerText = "✦ Match Draw";
    drawPoints+=1;
    drawpoints.innerText="• Draws:"+drawPoints
    document.querySelector('.game-box').classList.add('shake');
    setTimeout(() => document.querySelector('.game-box').classList.remove('shake'), 500);
    gameOver = true;
    player1.classList.remove("player-1");
    player2.classList.remove("player-2");
  }

}


newGame.addEventListener("click",function(){
  boxes.forEach((box) => {
    box.innerText=""
    box.classList.remove("symbolX");
    box.classList.remove("symbolO");
  })
  playerMove.classList.remove("winner");
  playerMove.innerText="O — your move"
  xStarts = !xStarts;
  isXTurn = xStarts;
  playerMove.classList.remove("winner");

  if(isXTurn){
    playerMove.innerText = "X — your move";
  }
  else{
    playerMove.innerText = "O — your move";
  }
  gameOver=false;
  boxes.forEach(box => box.classList.remove('winning-cell'));
  document.querySelector('.game-box').classList.remove('shake');
  player1.classList.remove("player-1")
  player2.classList.remove("player-2")

})