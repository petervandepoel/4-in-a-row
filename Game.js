var running = false;
var winner = 0;
var current_player = {};
var other_player = {};
var player1 = {};
var player2 = {};
var board = []; 
var status_message = "";
var game_type = "";


var player = function(index,type) {
	this.playerindex = index;
	this.playertype = type;
};


var do_move = function(board,row,column) {
	if(running == true)
	{
	if(check_valid_move(board,row,column)==true)
	{
	var row_to_fill = determine_drop_position(board,row,column);
	
	NewRenderer.Renderboard(board,row_to_fill,column,current_player.playerindex);
	
	set_board(board,row_to_fill,column,current_player.playerindex);
	
	if(determine_if_winner_exists(board,parseInt(row_to_fill),parseInt(column),current_player.playerindex)==false)
	{	
	current_player = change_player(current_player);
	do_next_move();		
	}
	
	$('.status').html(status_message);
	}
	}
};

function do_next_move() {
	if(current_player.playertype=="Computer" && running == true) {
	bot_move = do_bot_move(board,current_player.playerindex);
	do_move(board,bot_move[1],bot_move[0],current_player.playerindex);
	}
};


function check_valid_move(board,row,column) {
	if(running == false) { return false; }
	if(board[row][column].occupied == true) {
    status_message = "There is already a coin on this field.";
	return false;
    } else {
    status_message = "Your move will be executed player " + current_player.playerindex;
	return true;
    }
}

function determine_drop_position(board,row,column) {
    if(game_type=="Traditional")
	{
	for(k=0;k<10;k++) {
    if(board[k][column].occupied == true) { break; }
    }
    return k-1;
	}
	else if(game_type=="Drop_anywhere")
	{
	return row;	
	}
}

function set_board(board,row,column,playerindex) {
    board[row][column].occupied = true;
    board[row][column].by = current_player.playerindex;
}

function change_player(current_player) {
  if (current_player == player1 && winner != current_player.playerindex) {
  	current_player = player2;
	other_player = player1; }
	else { current_player = player1; other_player = player2;}
	status_message = "Player:  " + current_player.playerindex + " (" + current_player.playertype + ") please make a move."
	return current_player;
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

if(total_horizontal > 3 || total_vertical > 3 || total_diagonal_1 > 3 || total_diagonal_2 > 3) { running = false; winner = playerindex; status_message="There is a winner. Player " + winner + " has won the game! <button onclick=location.reload(true)>Start a new game!</button>"; $('.status').html(status_message); return true; } else { return false;
	
}
};



