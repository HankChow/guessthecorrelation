var canvasHeight = 320.0;
var canvasWidth = 320.0;

var threshold = 3100;

// Random time of submitting the form, which makes it more human-like.
var isRandom = true;
var timeFillGuess = 250;
var timeGuessNext = 250;
var timeNextFill = 250;
var randomFloor = 100; // not too small or it will lead to a mistake.
var randomCeiling = 500;

// When the amount of lives is more than 1, mistakes are allowed accidently, which makes it more human-like.
var isMistakesAllowed = true;
var mistakeRate = 0.2;

function correlation(){
	var points = document.getElementsByClassName('nv-point');
	var pointCount = points.length;
	var x = [];
	var y = [];
	var x_avg = 0.0;
	var y_avg = 0.0;
	for(var i = 0; i < pointCount; i++){
		var transform = points[i].getAttribute('transform');
		x[i] = ((transform.substring(10, transform.length - 1).split(','))[0]) / canvasWidth;
		y[i] = 1.0 - ((transform.substring(10, transform.length - 1).split(','))[1]) / canvasHeight;
		x_avg += x[i];
		y_avg += y[i];
	}
	x_avg /= pointCount;
	y_avg /= pointCount;
	var numerator = 0.0;
	var denominator = 0.0;
	var x_prosum = 0.0;
	var y_prosum = 0.0;
	for(var i = 0; i < pointCount; i++){
		numerator += ((x[i] - x_avg) * (y[i] - y_avg));
		x_prosum += (x[i] - x_avg) * (x[i] - x_avg);
		y_prosum += (y[i] - y_avg) * (y[i] - y_avg);
	}
	denominator = Math.sqrt(x_prosum * y_prosum);
	var r = (numerator / denominator).toFixed(2);
	if(isMistakesAllowed){
		if(getLife() > 1){
			var executeMistake = Math.random();
			if(executeMistake < mistakeRate){
				r = -r;
			}
		}
	}
	return r;
}

function fill(){
	var r_input = document.getElementById('guess-input');
	r_input.value = correlation();
	if(isRandom){
		timeFillGuess = parseInt(Math.random() * (randomCeiling - randomFloor) + randomFloor);
	}
	setTimeout("clickGuess()", timeFillGuess);
}

function clickGuess(){
	var btnGuess = document.getElementById('submit-btn');
	btnGuess.click();
	if(isRandom){
		timeGuessNext = parseInt(Math.random() * (randomCeiling - randomFloor) + randomFloor);
	}
	setTimeout("clickNext()", timeGuessNext);
}

function clickNext(){
	var btnNext = document.getElementById('next-btn');
	btnNext.click();
	if(getScore() < threshold){
		if(isRandom){
			timeNextFill = parseInt(Math.random() * (randomCeiling - randomFloor) + randomFloor);
		}
		setTimeout("fill()", timeNextFill);
	}
}

function getScore(){
	var coins = document.getElementsByClassName('ncoins');
	coinCount = coins[0].innerHTML;
	return coinCount;
}

function getLife(){
	var lives = document.getElementsByClassName('heart-empty heart-full');
	lifeCount = lives.length;
	return lifeCount;
}

function main(){
	fill();
}

main();
