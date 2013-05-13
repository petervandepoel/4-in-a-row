//var computer_bot_1 = function(board) {

function do_bot_move(board,playerindex) {
  var moves = get_available_moves(board);
  var evaluated_moves = [];
  evaluated_moves.length = moves.length;

  var best_move = {
    score : 0,
    x : 0,
    y: 0,
  };

    for(var j in moves) {
  evaluated_moves[j] = evaluate_move(board,moves[j],current_player.playerindex);
  if(evaluated_moves[j].score>best_move.score) { best_move.score = evaluated_moves[j].score; best_move.x = moves[j].x; best_move.y = moves[j].y; }
  //console.log("The move_score of move x: " + moves[j].x + ". y: " + moves[j].y + " is: " + evaluated_moves[j].score);
  }
  return [best_move.x,best_move.y];
}

function get_available_moves(board) {
 var available_moves = [];

 for(var i = 0;i<10;i++) {
    for(var j = 0;j<10;j++) {
    if(board[0][i].occupied == true && game_type=="Traditional") {break}; 
    if(board[j][i].occupied == true && game_type=="Traditional") { available_moves.push(board[j-1][i]); break;} 
	if(board[j][i].occupied == false && game_type =="Drop_anywhere") { available_moves.push(board[j][i]); }
	if(j==9 && game_type=="Traditional") {available_moves.push(board[j][i]); break;}
    }
	}
    
  return available_moves;
}

function calculate_space(board,piece,direction) {
    var row = parseInt(piece.y);
    var column = parseInt(piece.x);
    var counter = 1;
    var space = 0;

    if(direction=="right") { var left = 0; var right = 1; var top = 0; var down = 0; var x = 1; var y = 0; }
    if(direction=="left") { var left = 1; var right = 0; var top = 0; var down = 0; var x = -1; var y = 0; }
    if(direction=="top") { var left = 0; var right = 0; var top = 1; var down = 0; var x = 0; var y = -1;}
    if(direction=="down") { var left = 0; var right = 0; var top = 0; var down = 1; var x = 0; var y = 1;}
    if(direction=="top_right") { var left = 0; var right = 1; var top = 1; var down = 0; var x = 1; var y = -1; }
    if(direction=="top_left") { var left = 1; var right = 0; var top = 1; var down = 0; var x = -1; var y = -1;}
    if(direction=="down_left") { var left = 1; var right = 0; var top = 0; var down = 1; var x = -1; var y = 1; }
    if(direction=="down_right") { var left = 0; var right = 1; var top = 0; var down = 1; var x = 1; var y = 1;}

    for(counter;;)
    {
    if((row+(y*top*counter)<0) || (row+(y*down*counter)>9) || (column+(x*left*counter)<0) || (column+(x*right*counter)>9)) {       break; }
    if(board[(row+(y*counter))][(column+(x*counter))].occupied == true) { break; }
    space++
    counter++;
    }
return space;
}

function calculate_connections(board,piece,playerindex,direction) {
    var row = parseInt(piece.y);
    var column = parseInt(piece.x);
    var counter = 1;
    var connections = 0;

    if(direction=="right") { var left = 0; var right = 1; var top = 0; var down = 0; var x = 1; var y = 0; }
    if(direction=="left") { var left = 1; var right = 0; var top = 0; var down = 0; var x = -1; var y = 0; }
    if(direction=="top") { var left = 0; var right = 0; var top = 1; var down = 0; var x = 0; var y = -1;}
    if(direction=="down") { var left = 0; var right = 0; var top = 0; var down = 1; var x = 0; var y = 1;}
    if(direction=="top_right") { var left = 0; var right = 1; var top = 1; var down = 0; var x = 1; var y = -1; }
    if(direction=="top_left") { var left = 1; var right = 0; var top = 1; var down = 0; var x = -1; var y = -1;}
    if(direction=="down_left") { var left = 1; var right = 0; var top = 0; var down = 1; var x = -1; var y = 1; }
    if(direction=="down_right") { var left = 0; var right = 1; var top = 0; var down = 1; var x = 1; var y = 1;}

    for(counter;;)
    {
    if((row+(y*top*counter)<0) || (row+(y*down*counter)>9) || (column+(x*left*counter)<0) || (column+(x*right*counter)>9)) {       break; }
    if(board[(row+(y*counter))][(column+(x*counter))].occupied == false || board[(row+(y*counter))][(column+(x*counter))].by != playerindex) { break; }
    connections++
    counter++;
    }
return connections;
}

function evaluate_move(board,move,playerindex) {
    var right_space = calculate_space(board,move,"right");
    var left_space =  calculate_space(board,move,"left");
    var top_space = calculate_space(board,move,"top");
    var down_space = calculate_space(board,move,"down");
    var diagonal_space_1_right = calculate_space(board,move,"top_right");
    var diagonal_space_1_left = calculate_space(board,move,"down_left");
    var diagonal_space_2_right = calculate_space(board,move,"down_right");
    var diagonal_space_2_left = calculate_space(board,move,"top_left");
    var right_connection_me = calculate_connections(board,move,current_player.playerindex,"right");
    var left_connection_me = calculate_connections(board,move,current_player.playerindex,"left");
    var top_connection_me =  calculate_connections(board,move,current_player.playerindex,"top");
    var down_connection_me = calculate_connections(board,move,current_player.playerindex,"down");
    var diagonal_connection_1_right_me = calculate_connections(board,move,current_player.playerindex,"top_right");
    var diagonal_connection_1_left_me = calculate_connections(board,move,current_player.playerindex,"down_left");
    var diagonal_connection_2_right_me = calculate_connections(board,move,current_player.playerindex,"down_right");
    var diagonal_connection_2_left_me = calculate_connections(board,move,current_player.playerindex,"top_left");
    var right_connection_opponent = calculate_connections(board,move,other_player.playerindex,"right");
    var left_connection_opponent = calculate_connections(board,move,other_player.playerindex,"left");
    var top_connection_opponent = calculate_connections(board,move,other_player.playerindex,"top");
    var down_connection_opponent = calculate_connections(board,move,other_player.playerindex,"down");
    var diagonal_connection_1_right_opponent = calculate_connections(board,move,other_player.playerindex,"top_right");
    var diagonal_connection_1_left_opponent = calculate_connections(board,move,other_player.playerindex,"down_left");
    var diagonal_connection_2_right_opponent = calculate_connections(board,move,other_player.playerindex,"down_right");
    var diagonal_connection_2_left_opponent = calculate_connections(board,move,other_player.playerindex,"top_left");

    var total_horizontal_space = right_space + left_space;
    var total_vertical_space = top_space + down_space;
    var total_diagonal_1_space = diagonal_space_1_right + diagonal_space_1_left;
    var total_diagonal_2_space = diagonal_space_2_right + diagonal_space_2_left;

    var total_horizontal_connection_me = right_connection_me + left_connection_me + 1;
    var total_vertical_connection_me = top_connection_me + down_connection_me + 1;
    var total_diagonal_connection_1_me = diagonal_connection_1_right_me + diagonal_connection_1_left_me;
    var total_diagonal_connection_2_me = diagonal_connection_2_right_me + diagonal_connection_2_left_me;

    var total_horizontal_connection_opponent = right_connection_opponent + left_connection_opponent + 1;
    var total_vertical_connection_opponent = top_connection_opponent + down_connection_opponent + 1;
    var total_diagonal_connection_1_opponent = diagonal_connection_1_right_opponent + diagonal_connection_1_left_opponent;
    var total_diagonal_connection_2_opponent = diagonal_connection_2_right_opponent + diagonal_connection_2_left_opponent;

    //var total_space = total_horizontal_space + total_vertical_space + total_diagonal_1_space + total_diagonal_2_space;

    var connection_power = 0;

    //if((total_horizontal_space+total_horizontal_connection_me)>3) {
      connection_power += Math.pow(total_horizontal_connection_me,total_horizontal_connection_me);
    //}

    //if((total_vertical_space+total_vertical_connection_me)>3) {
      connection_power += Math.pow(total_vertical_connection_me,total_vertical_connection_me);
    //}

    //if((total_diagonal_1_space+total_diagonal_connection_1_me)>3) {
      connection_power += Math.pow(total_diagonal_connection_1_me,total_diagonal_connection_1_me);
    //}

    //if((total_diagonal_2_space+total_diagonal_connection_2_me)>3) {
      connection_power += Math.pow(total_diagonal_connection_2_me,total_diagonal_connection_2_me);
    //}

    //  if((total_horizontal_space+total_horizontal_connection_opponent)>3) {
      connection_power += Math.pow(total_horizontal_connection_opponent,total_horizontal_connection_opponent);
    //}

    //if((total_vertical_space+total_vertical_connection_opponent)>3) {
      connection_power += Math.pow(total_vertical_connection_opponent,total_vertical_connection_opponent);
    //}

    //if((total_diagonal_1_space+total_diagonal_connection_1_opponent)>3) {
      connection_power += Math.pow(total_diagonal_connection_1_opponent,total_diagonal_connection_1_opponent);
    //}

    //if((total_diagonal_2_space+total_diagonal_connection_2_opponent)>3) {
      connection_power += Math.pow(total_diagonal_connection_2_opponent,total_diagonal_connection_2_opponent);
    //}

    return {evaluated_move: move, score: connection_power};

}