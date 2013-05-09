function CssRenderer(elm) {
  var board = []; //note that board[row][column] is 'reversed' in terms of x,y. So board[3][5] is x=5, y=3;
  var canvas = $(elm);
  var bot_move = [];
  var playerindex = 1;


coin = function (board,x,y) {
    this.x = x;
    this.y = y
    this.occupied = false;
    this.by = 0
  };

      canvas.on("click", ".coin", function() {

        //set the clicked position (row + column) and update status
        var row = $(this).attr("row");
        var column = $(this).attr("column");
        //$('.status').html("Selected coin: row = " + row + " and column = " + column);

        do_move(board,row,column,playerindex);

        function do_move(board,row,column,playerindex)
        {
        if(check_valid_move(board,row,column)) {
        var row_to_fill = determine_drop_position(board,column);

          //now we know where to place the coin, we must update the canvas AND update the board array

          //search for position on canvas
          var $coin = canvas.find(".row"+row_to_fill+".column"+column);

          //update the position

          //set content
          var $coin = $('<div>').addClass('coin').addClass("row"+row_to_fill).addClass("column"+column).addClass("player"+                playerindex);

          //set position
          $coin.css("left", 20*column + "px");
          $coin.css("top", 20*row_to_fill + "px");
          $coin.attr("row",row_to_fill);
          $coin.attr("column",column);
          //add to canvas
          canvas.append($coin);

          //set board
          set_board(board,row_to_fill,column,playerindex);

          determine_if_winner_exists(board,parseInt(row_to_fill),parseInt(column),playerindex);

          playerindex = change_player(playerindex);

          };

          if(playerindex==2 && running == true) {

          bot_move = do_bot_move(board,playerindex);
          do_move(board,bot_move[1],bot_move[0],playerindex);
          playerindex = change_player(playerindex);
          }



         } //close if
     });  //close canvas.on


        //draw initial board
        this.publics = {
              drawBoard : function() {
              for(var i = 0; i<10; i++) {
              board[i] = [];

                  for(var j = 0; j<10; j++) {
                  board[i][j] = new coin(board[i][j],j,i);
                  var $coin = $('<div>').addClass('coin').addClass("row"+j).addClass("column"+i);

      	          $coin.css("left", i*20 + "px");
                  $coin.css("top", j*20 + "px");
                  $coin.attr("row",j);
                  $coin.attr("column",i);
                  canvas.append($coin);
                  }

              }
            }

        };




};