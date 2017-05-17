$(document).ready(function(){

	const freshDeck = createDeck();
	var theDeck = freshDeck;

	var playersHand = [];
	var dealersHand = [];
	

	function createDeck() {
		var newDeck = [];
		const suits = ['h','s','d','c'];
		for(let s = 0; s < suits.length; s++) {
			for(let c = 1; c <= 13; c++) {
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}
	$('.deal-button').click(function(){
		console.log("User clicked Deal!!");
		theDeck = shuffleDeck();

		var removedCard = theDeck.shift()
		playersHand.push(removedCard);

		removedCard = theDeck.shift()
		dealersHand.push(removedCard);

		removedCard = theDeck.shift()
		playersHand.push(removedCard);

		removedCard	= theDeck.shift()
		dealersHand.push(removedCard);

		console.log(theDeck.length);
		placeCard('player', 1, playersHand[0]);
		placeCard('dealer', 1, dealersHand[0]);
		placeCard('player', 2, playersHand[1]);
		placeCard('dealer', 2, dealersHand[1]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');

	});

	$('.hit-button').click(function() {
		console.log("User clicked hit!")
		playersHand.push(theDeck.shift());
		placeCard('player', playersHand.length,playersHand[playersHand.length-1])
		calculateTotal(playersHand, 'player');
	})

	$('.stand-button').click(function() {
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal < 17) {
			dealersHand.push(theDeck.shift());
			dealerTotal = calculateTotal(dealersHand, 'dealer');
		}
	});

	// function checkWin() {
	// 	var playerTotal = calculateTotal(playersHand, 'player');
	// 	var dealerTotal = calculateTotal(playersHand, 'dealer');
	// 	if player > 21 ... 
	// }

	function calculateTotal(hand,who) {
		var total = 0;
		var thisCardValue = 0;
		for(let i=0; i < hand.length; i++) {
			thisCardValue = Number(hand[i].slice(0,-1));
			total += thisCardValue
		}

		var classSelector = '.' + who + '-total';
		$(classSelector).html(total);
		return total;

	}



	function placeCard(who,where,cardToPlace) {
		var classSelector = '.' + who + '-cards .card-' + where;
		$(classSelector).html('<img src="images/cards/' + cardToPlace + '.png">');
	}


	function shuffleDeck() {
		for (let i=0; i< 500; i++) {
			var randomCard1 = Math.floor(Math.random() * theDeck.length)
			var randomCard2 = Math.floor(Math.random() * theDeck.length)
			var temp = theDeck[randomCard1];
			theDeck[randomCard1] = theDeck[randomCard2];
			theDeck[randomCard2] = temp;
		}
		return theDeck;
	}
});
