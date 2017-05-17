$(document).ready(function(){


	// MAIN VARIABLE //
	const freshDeck = createDeck();
	var playersHand = [];
	var dealersHand = [];
	var theDeck = freshDeck.slice();// this copies the array, doesnt just simply rename a variable, so you have a dupilcate of the first array


	// EVENT HANDLERS //
	$('.deal-button').click(function(){
		// shuffleDeck();
		//Deals cards to the players
		reset();
	
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		placeCard('player',1,playersHand[0])
		placeCard('player',2,playersHand[1])

		placeCard('dealer',1,dealersHand[0])
		placeCard('dealer',2,dealersHand[1])

		calculateTotal(playersHand,'player')
		calculateTotal(dealersHand,'dealer')


	});

	$('.hit-button').click(function(){
		if(calculateTotal(playersHand, 'player') < 21) {
			playersHand.push(theDeck.shift());
			var lastCardIndex = playersHand.length -1;
			var slotForNewCard = playersHand.length;
			placeCard('player', slotForNewCard, playersHand[lastCardIndex]);
			calculateTotal(playersHand, 'player');
		}

	});

	$('.stand-button').click(function(){
		var dealerTotal = calculateTotal(dealersHand, 'dealer')

		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length -1;
			var slotForNewCard = dealersHand.length;
			placeCard('dealer', slotForNewCard,dealersHand[lastCardIndex])
			dealerTotal = calculateTotal
		}

		checkWin();
		
	});

	// UTILITY FUNCTIONS //

	function createDeck() {
		var newDeck = [];
		var suits = ['h', 's', 'd', 'c'];

		for(let s=0; s<suits.length; s++){
			for(let c =1; c<= 13; c++) {
				newDeck.push(c+suits[s])
			}
		}
		return newDeck;
	}

	function shuffleDeck() {
		for(let i =0; i < 14000; i++) {
			var random1 = Math.floor(Math.random() * 52); // random creates a 16 digit number between 0 and 1 and math.floor hacks off the remaining digits. 52 is for the number of cards in the array;
			var random2 = Math.floor(Math.random() * 52);
			var temp = theDeck[random1];
			theDeck[random1] = theDeck[random2];
			theDeck[random2] = temp;
		}
	}

	function placeCard(who, where, what) {
		var slotForCard = '.' + who +'-cards .card-' + where;
		imageTag = '<img src="images/cards/'+what+'.png">';
		$(slotForCard).html(imageTag)
	}

	function calculateTotal(hand, who) {
		var totalHandValue = 0;
		var thisCardValue = 0;
		var hasAce = false;
		var totalAce = 0;
		for(let i= 0; i <hand.length; i++) {
			thisCardValue = Number(hand[i].slice(0,-1));
			totalHandValue += thisCardValue;

			if(thisCardValue > 10) {
				thisCardValue = 10;
			}else if(thisCardValue == 1) {
				hasAce = true;
				totalAce = 0;
				thisCardValue = 11;
			}

			totalHandValue += thisCardValue;
		}
			for(let i=0; i<totalAce; i++) {
				if (totalHandValue > 21){
					totalHandValue -= 10;
				}
		}

		var totalUpdated = '.' + who + '-total-number';
		$(totalUpdated).text(totalHandValue);
		return totalHandValue
	}

	function checkWin () {
		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		var winner = "";

		if(playerTotal > 21) {
			winner = "Player has busted. Dealer wins."

		}else if(dealerTotal > 21) {
			winner = "Dealer has busted, You win!"
		}else {
			if(playerTotal > dealerTotal) {
				winner = "You beat the dealer!"

			}else if(playerTotal < dealerTotal) {
				winner = " The dealer has beste dyou. We get yoru money!"

			}else {
				winner = "It's a push"
			}
			$('message').text('')
		}
	}

	function reset() {
		theDeck = freshDeck.sliced();
		shuffleDeck();

		playersHand = [];
		dealersHand = [];

		$('.card').html('');

		$('.player-total-number').html('0');
		$('.dealer-total-number').html('0');
	}

});
