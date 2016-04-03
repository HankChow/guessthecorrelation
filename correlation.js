function correlation(){
	var points = document.getElementsByClassName('nv-point');
	var pointCount = points.length;
	var x = [];
	var y = [];
	var x_avg = 0.0;
	var y_avg = 0.0;
	for(var i = 0; i < pointCount; i++){
		var transform = points[i].getAttribute('transform');
		x[i] = ((transform.substring(10, transform.length - 1).split(','))[0]) / 320.0;
		y[i] = 1.0 - ((transform.substring(10, transform.length - 1).split(','))[1]) / 320.0;
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
	return r;
}

function fill(){
	var r_input = document.getElementById('guess-input');
	r_input.value = correlation();
	setTimeout("clickGuess()", 250);
}

function clickGuess(){
	var btnGuess = document.getElementById('submit-btn');
	btnGuess.click();
	setTimeout("clickNext()", 500);
}

function clickNext(){
	var btnNext = document.getElementById('next-btn');
	btnNext.click();
	setTimeout("fill()", 500);
}

function main(){
	fill();
}

main();
