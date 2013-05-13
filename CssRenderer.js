CssRenderer = function(elm) {
	//note that board[row][column] is 'reversed' in terms of x,y. So board[3][5] is x=5, y=3;
  	var canvas = $(elm);
  	 	
	coin = function (x,y) {
	    this.x = x;
	    this.y = y;
	    this.occupied = false;
	    this.by = 0;
				
  	};

    	canvas.on("click", ".coin", function() {
        var row = $(this).attr("row");
        var column = $(this).attr("column");
    	do_move(board,row,column);
		});
		
		this.Renderboard = function(board,row,column,playerindex) {
		var $coin = canvas.find(".row"+row+".column"+column);
        var $coin = $('<div>').addClass('coin').addClass("row"+row).addClass("column"+column);
        $coin.css("left", 40*column + "px");
        $coin.css("top", 40*row + "px");
        $coin.attr("row",row);
        $coin.attr("column",column);
          //add to canvas

        //since setTimeout evaluates at runtime addClass must be set as 'hard' value
		if(playerindex==1) {
        setTimeout(function() {$coin.addClass("player1");},1);
        canvas.append($coin)
        } else {
        setTimeout(function() {$coin.addClass("player2");},1);
        canvas.append($coin)
        }
};
     
        //draw initial board
        this.publics = {
                drawBoard : function() {
              for(var i = 0; i<10; i++) {
              board[i] = [];
	              for(var j = 0; j<10; j++) {
	              board[i][j] = new coin(j,i);
	              var $coin = $('<div>').addClass('coin').addClass("row"+j).addClass("column"+i);
	  	          $coin.css("left", i*40 + "px");
	              $coin.css("top", j*40 + "px");
	              $coin.attr("row",j);
	              $coin.attr("column",i);
	              canvas.append($coin);
                }

              }
            }

        };

};


