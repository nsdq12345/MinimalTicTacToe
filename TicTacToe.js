var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var gameboard = [['','',''],['','',''],['','','']]
var win = false;
var currentTurn = 'O';

var printBoard = function() {
  var masterString = '   0  1  2';

  for (var r = 0; r < 3; r++) {
    var string = r + ' '
    for (var c = 0; c < 3; c++) {
      string += '[';
      if (gameboard[r][c] === '') {
        string += ' ';
      } else {
        string += gameboard[r][c];
      }
      string += ']'
    }
    masterString += '\n' + string;
  }
  console.log(masterString, `Current Turn: ${currentTurn}`);
}

var checkForWin = function() {
  //check horizontal
  for (var r = 0; r < 3; r++) {
    var match = true;
    for (var c = 0; c < 3; c++) {
      if (gameboard[r][c] === '' || gameboard[r][c] !== gameboard[r][0]) {
        match = false;
      }
    }
    if (match) {
      console.log(`${currentTurn} WINS!`);
      win = true;
    }
  }

  for (var c = 0; c < 3; c++) {
    var match = true;
    for (var r = 0; r < 3; r++) {
      if (gameboard[r][c] === '' || gameboard[r][c] !== gameboard[0][c]) {
        match = false;
      }
    }
    if (match) {
      console.log(`${currentTurn} WINS!`);
      win = true;
    }
  }

  if (gameboard[0][0] !== '' && gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
    console.log(`${currentTurn} WINS!`);
    win = true;
  }

  if (gameboard[0][2] !== '' && gameboard[0][2] === gameboard[1][1] && gameboard[0][2] === gameboard[2][0]) {
    console.log(`${currentTurn} WINS!`);
    win = true;
  }
}

printBoard();

var putPiece = function(r, c) {
  gameboard[r][c] = currentTurn;
  checkForWin();
  if (gameboard[r][c] === '') {
    console.log('that spot is already taken!')
  } else if (currentTurn === 'X') {
    currentTurn = 'O';
  } else {
    currentTurn = 'X';
  }
}

rl.on('line', (line) => {
  if (line === 'reset') {
    gameboard = [['','',''],['','',''],['','','']];
    win = false;
    printBoard();
  } else if (win) {
    console.log('game over, input "reset" to restart');
  } else if (!['00', '01', '02', '10', '11', '12', '20', '21', '22', ].includes(line)) {
    console.log('invalid input');
  } else {
    putPiece(line[0], line[1]);
    printBoard();
  }
})

