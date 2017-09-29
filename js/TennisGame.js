var canvas;
			var canvasContext;
			var ballX = 50;
			var ballY = 50;
			var ballXSpeed = 11;
			var ballYSpeed = 6;
			var fasterBall = 0;
			var P1Score = 0;
			var P2Score = 0;	
			var paddle1Y = 250;
			var paddle2Y = 250;
			var matchEnded = false;
			const PADDLE_HEIGHT = 100;
			const PADDLE_THICK = 10;
			const WINNER = 3;

			function calculateMousePosition (event) {
			    var rect = canvas.getBoundingClientRect();
				var root = document.documentElement;
				var mouseX = event.clientX - rect.left - root.scrollLeft;
				var mouseY = event.clientY - rect.top - root.scrollTop;
				return {
				    x:mouseX,
					y:mouseY
				};
 			
			}

			function mouseClickEndGame () {
				if (matchEnded) {
					P1Score = 0;
				    P2Score = 0;
					matchEnded = false;
				}
			}
			
			window.onload = function () {
			    canvas = document.getElementById("GameCanvas");
                canvasContext = canvas.getContext("2d");
                
				var FPS = 30;
				setInterval(function () {
				    Draw();
					Move();
				}, 1000/FPS);
				
				canvas.addEventListener("mousemove", function (event) {
                    var mousePosition = calculateMousePosition(event);
			        paddle1Y = mousePosition.y - (PADDLE_HEIGHT / 2);                   										
				});

				canvas.addEventListener("mousedown", mouseClickEndGame);
			}
	    
        function Move () {
			if (matchEnded) {
				return;
			}

			ComputerAI();
			
			ballX = ballX + ballXSpeed;
			ballY = ballY + ballYSpeed;
			
			if (ballX < 0) {
			    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			        ballXSpeed = -ballXSpeed;
					fasterBall = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
					ballYSpeed = fasterBall * 0.25;
				} else {
					  P2Score++;
 				      ballReset(); 
				}		   
			}
			
			if (ballX > canvas.width - PADDLE_THICK) {
			    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			        ballXSpeed = -ballXSpeed;
					fasterBall = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
					ballYSpeed = fasterBall * 0.25;
				} else {
					  P1Score++;	  
 				      ballReset();
				}		   
			}
			
			if (ballY > canvas.height) {
			    ballYSpeed = -ballYSpeed;
			}

			if (ballY < 0) {
			    ballYSpeed = -ballYSpeed;
			}
		}		
	    
		function Draw () {
		    RectColors(0, 0, canvas.width, canvas.height, "black");

			if (matchEnded) {
				canvasContext.fillStyle = "white";
				if (P1Score > P2Score) {
				    canvasContext.fillText ("YOU WIN!.", 357, 275);
				} else {
			        canvasContext.fillText ("GAME OVER!.", 350, 275);
			    }
				canvasContext.fillText ("Click to continue.", 342, 500);
				return;
			}

			for (var i=0; i < canvas.height; i+=34) {
				RectColors(canvas.width / 2 - 1, i, 2, 20, "white");
			}

			RectColors(0, paddle1Y, PADDLE_THICK, PADDLE_HEIGHT, "white");
            RectColors(canvas.width-PADDLE_THICK, paddle2Y, PADDLE_THICK, PADDLE_HEIGHT, "white");

			canvasContext.fillText ("Federer: " + P1Score, 100, 100);
			canvasContext.fillText ("Nadal: " + P2Score, canvas.width - 100, 100);
			
			CircleColors(ballX, ballY, 10, "green");
		}
		
		function RectColors (leftX, topY, sWidth, sHeight, drawColor) {
		    canvasContext.fillStyle = drawColor;
			canvasContext.fillRect(leftX, topY, sWidth, sHeight);
		}
		
		function CircleColors (centerX, centerY, cRadius, drawColor) {
		    canvasContext.fillStyle = drawColor;
			canvasContext.beginPath();
			canvasContext.arc(centerX, centerY, cRadius, 0, Math.PI * 2, true);
			canvasContext.fill();
		}
		
		function ComputerAI () {
		    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
		    
			if (paddle2YCenter < ballY - 35) {
			    paddle2Y += 8;
			} else if (paddle2YCenter > ballY + 35) {
			    paddle2Y -= 8;
			}
		}
	    
		function ballReset () {
			if (P1Score >= WINNER || P2Score >= WINNER) {
				matchEnded = true;
			} 
			
			ballXSpeed = -ballXSpeed;
			ballYSpeed = 6;
		    ballX = canvas.width / 2;
			ballY = canvas.height / 2;
		}
		