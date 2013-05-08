var running = true;
var winner = 0;

function check_valid_move(board,row,column) {
	if(running == false) { return false; }
	if(board[row][column].occupied == true) {
    $('.status').html("There is already a coin on this field, try another one.");
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

function determine_if_winner_exists(board,row,column,playerindex) {

var right = 0;
var left = 0;
var top = 0;
var down = 0;
var right_top = 0;
var right_down = 0;
var left_top = 0;
var left_down = 0;

for(var i = 1;i<4;i++) {
	if(row-i<0) {break; }
    if (board[row-i][column].by == playerindex) { top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(column-i<0) {break; }
	if (board[row][column-i].by == playerindex) { left++; }

	else { break; }
}

for(var i = 1;i<4;i++) {
	if(column+i>9) {break; }
	if(board[row][column+i].by == playerindex) { right++; }

	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9) {break; }
	if (board[row+i][column].by == playerindex) { down++; }

	else { break; }
}



for(var i = 1;i<4;i++) {
	if(row-i<0 || column+i>9) {break; }
	if (board[row-i][column+i].by == playerindex) { right_top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row-i<0 || column-i<0) {break; }
	if (board[row-i][column-i].by == playerindex) { left_top++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9 || column+i>9) {break; }
	if (board[row+i][column+i].by == playerindex) { right_down++; }
	else { break; }
}

for(var i = 1;i<4;i++) {
	if(row+i>9 || column-i<0) {break; }
	if (board[row+i][column-i].by == playerindex) { left_down++; }
	else { break; }
}

var total_horizontal = left + right + 1;
var total_vertical = top + down + 1;
var total_diagonal_1 = left_top + right_down + 1;
var total_diagonal_2 = right_top + left_down + 1;

if(total_horizontal > 3 || total_vertical > 3 || total_diagonal_1 > 3 || total_diagonal_2 > 3) { running = false; winner = playerindex; $('.status').html("There is a winner. Player " + winner + " has won the game! <button onclick=location.reload(true)>Start a new game!</button>"); }



}







