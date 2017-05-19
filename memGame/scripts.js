$(document).ready(function(){
	var cards = [
	'<img src="images/monsters-01.png">',
	'<img src="images/monsters-02.png">',
	'<img src="images/monsters-03.png">',
	'<img src="images/monsters-04.png">',
	'<img src="images/monsters-17.png">',
	'<img src="images/monsters-18.png">'
	];

	var gridSize = 12;
	var memoryGameHTML = '';
	for (let i=0; i< gridSize; i++) {
		if(i<2) {
			card = cards[0];
		}else if(i<4) {
			card = cards[1];
		}else if(i<6) {
			card = cards[2];
		}else if(i<8){
			card = cards[3];
		}else if(i<10){
			card = cards[4];
		}else {
			card = cards[5];
		}

		memoryGameHTML +='<div class="card col-sm-3">';
			memoryGameHTML += '<div class="card-holder">';
				memoryGameHTML += `<div class="card-front">${card}</div>`;
				memoryGameHTML += `<div class="card-back"></div>`;
			memoryGameHTML += '</div>';
		memoryGameHTML += '</div>';

	}
	$('.mg-contents').html(memoryGameHTML);

	$('.card-holder').click(function(){
		$(this).toggleClass('flip'); 

		var cardsUp = $('.flip'); //tags and classes will always return an array
		if(cardsUp.length == 2) {
			var card1 = cardsUp[0].children[0].children[0].src;
			var card2 = cardsUp[1].children[0].children[0].src;
			var score = 0;
			if(card1 == card2) {
				cardsUp.removeClass('flip');
				cardsUp.addClass('matched');
				var matchedCards = $('.matched');

				$('#Score').html("Matches " + matchedCards.length/2);
				if(matchedCards.length == gridSize){
					setTimeout(function(){
						alert("You have won the game!");
					},1000);
					
				}
			}else {
				setTimeout(function(){
					cardsUp.removeClass('flip');
				},2000);
			
			}
		}


	})



});


