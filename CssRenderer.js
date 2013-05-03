function CssRenderer(elm) {
  var board = [];
  var canvas = $(elm);

coin = function (board) {
    this.occupied = false;
    this.by = 0
  };

      canvas.on("click", ".coin", function() {

        //set the clicked position (row + column) and update status
        var row = $(this).attr("row");
        var column = $(this).attr("column");
        $('.status').html("Selected coin: row = " + row + " and column = " + column);

        //check if position already contains a coin. If so, return error message. Else, place coin.
        if(board[row][column].occupied == true) {
        $('.status').html("There is already a coin on this field, try another one");
        }
        else {
        //make sure that coin is 'dropped' at lowest point in the row (Lowest = 9; highest = 0)
            var k = 9;
            var row_to_fill = 9;

            while(k>0) {

            if(board[k][column].occupied == true) {
            row_to_fill = k-1;
            }
            k--;
            }

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
            board[row_to_fill][column].occupied = true;
            board[row_to_fill][column].by = playerindex;

            //change player
            playerindex = (playerindex==1) ? 2 : 1;
     }


  });
        //draw initial board
        this.publics = {
              drawBoard : function() {
              for(var i = 0; i<10; i++) {
              board[i] = [];

                  for(var j = 0; j<10; j++) {
                  board[i][j] = new coin(board[i][j]);
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