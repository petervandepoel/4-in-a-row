function check_valid_move(board,row,column) {
    if(board[row][column].occupied == true) {
    $('.status').html("There is already a coin on this field, try another one");
    return false;
    } else {
    return true
    }
}

function determine_drop_position(board,column) {
    for(k=0;k<10;k++) {
    if(board[k][column].occupied == true) { break; }
    }
    return k-1;
}

function set_board(board,row,column,playerindex) {
    board[row][column].occupied = true;
    board[row][column].by = playerindex;
}

function change_player(playerindex) {
  playerindex = (playerindex==1) ? 2 : 1;
  return playerindex;
}

function get_horizontal_pieces(board,row,playerindex) {
    var pieces = []

    //for(var i in board) {
        for(var j in board[row]) {
        if(board[row][j].occupied == true && board[row][j].by == playerindex)
        {
            pieces.push(board[row][j]);
            //check horizontal
        }
      }
      //}
     return pieces;
}

function get_vertical_pieces(board,column,playerindex) {
    var pieces = []

    //for(var i in board) {
        for(var j in board) {
        if(board[j][column].occupied == true && board[j][column].by == playerindex)
        {
            pieces.push(board[j][column]);
            //check horizontal
        }
      }
      //}
     return pieces;
}


//not fully working * diagonal check not included * inefficient code :(
function determine_if_winner_exists(board,row,column,playerindex) {
    //search for a place on the board that contains a coin
    for(var i = 0;i<10;i++)
    {
    var pieces = get_horizontal_pieces(board,i,playerindex);

    var last_x = -1;
    var last_y = -1;
    var counter_x = 1;
    var counter_y = 1;


    for(var j in pieces) {

        var x = pieces[j].x;
        var y = pieces[j].y;

        //if(board[x][y])

        if(pieces[j].x == (last_x + 1))
        {
        counter_x++;
        last_x = pieces[j].x;
        }
        else
        {
        counter_x = 1;
        last_x = pieces[j].x;
        }
        if(counter_x == 4) {
        alert("Winner detected! Player " + playerindex + "has won the game.");
        break;
        }

    }
    }


for(var i = 0;i<10;i++)
    {
    var pieces = get_vertical_pieces(board,i,playerindex);

    var last_x = -1;
    var last_y = -1;
    var counter_x = 1;
    var counter_y = 1;


    for(var j in pieces) {

        if(pieces[j].y == (last_y + 1))
        {
        counter_y++;
        last_y = pieces[j].y;
        }
        else
        {
        counter_y = 1;
        last_y = pieces[j].y;
        }

        if(counter_y == 4) {
        alert("Winner detected! Player " + playerindex + "has won the game.");
        break;
        }

    }
    }




}






