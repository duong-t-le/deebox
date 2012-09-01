/*
 * deebox.js
 * author: Duong Le
 * 
 * 
 * 
 */

var test_display = {
	'start_x' : 200,
	'start_y' : 36,
	'delta_x' : 11.5,
	'delta_y' : 11.25,
	'radius' : 5,
	'staffWidth' : 3,
	'staffSmallWidth' : 1,
	'gridWidth' : 23,
	'canvas_width':3000,
	'canvas_height':232
};

var NOTES_LINES = 14;

var displaySetting = test_display;

var START_X = displaySetting.start_x;
var START_Y = displaySetting.start_y;

var DELTA_X = displaySetting.delta_x;
var DELTA_Y = displaySetting.delta_y;

var RECT_HEIGHT = DELTA_Y * NOTES_LINES;



var saveState = [];
var savePoints = [];

var marker = null;

var notes = ['C','B','A','G','F','E','D','C'];

$('#output').val('0,10|0,14|2,12|6,10|8,7|10,6|12,5|12,10|12,14|14,10|14,3|16,14|18,10|18,5|20,7|20,14|22,12|22,3|22,7|24,10|24,14|26,10|28,14|30,10|32,14|32,7|34,6|34,12|36,14|36,10|36,5|38,10|38,5|40,14|40,5|42,10|42,4|44,14|44,5|46,10|48,14|48,10|50,10|50,5|52,14|52,6|54,7|54,3|56,14|56,6|58,10|58,7|60,7|60,14|62,10|62,12|64,3|66,10|66,3|66,12|70,3|70,12|72,2|72,14|72,10|74,10|74,1|74,12|76,0|78,10|78,12|80,3|82,3|82,12|84,14|86,10|86,6|88,14|88,3|90,10|90,2|92,14|94,10|94,6|96,14|96,3|98,10|98,7|100,14|102,10|102,3|104,14|104,3|106,10|106,7|108,3|108,9|110,9|110,12|110,5|112,9|114,12|114,8|116,14|116,7|118,6|118,9|120,5|120,10|120,14|122,10|122,3|124,14|126,10|126,5|128,7|128,14|130,12|130,3|130,7|132,10|132,14|134,10|136,14|138,10|140,14|140,7|142,6|142,12|144,14|144,10|144,5|146,10|146,5|148,14|148,5|150,10|150,4|152,14|152,5|154,10|156,14|156,10|158,10|158,5|160,14|160,6|162,7|162,3|164,14|164,6|166,10|166,7|168,7|168,14|170,10|170,12|172,3|174,10|174,3|174,12|178,3|178,12|180,2|180,14|182,10|182,1|182,12|184,0|186,10|186,12|188,3|190,3|190,12|192,14|194,10|194,6|196,14|196,3|198,10|198,2|200,14|202,10|202,6|204,14|204,3|206,10|206,7|208,14|210,10|210,3|212,14|212,3|214,10|214,7|216,3|216,11|218,5|218,11|218,12|220,11|222,12|222,7|224,8|226,14|227,10|228,7|');



var store = new MusicStore();

var DISPLAY_GRID = true;

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function drawCircle(c, x, y, rad) {
	c.beginPath();
	c.arc(x, y, rad, 0, getRadians(360), true);
	c.fillStyle = "#8ED6FF";
	c.fill();
	c.lineWidth = 2;
	c.strokeStyle = "black";
	c.stroke();
}

function clickStrip(e) {
	var START_X = displaySetting.start_x;
	var START_Y = displaySetting.start_y;

	var DELTA_Y = displaySetting.delta_y;
	var DELTA_X = displaySetting.delta_x;

	var pos = getCoords(e);
	//console.log(pos.x +", " + pos.y);
	if(pos.x < START_X || pos.y < START_Y || pos.y > RECT_HEIGHT + START_Y)
		return;

	var normX = pos.x - START_X;
	var lockedX = parseInt(normX / DELTA_X) * DELTA_X;

	/*    closer to right                       ; closer to left */
	if(Math.abs((lockedX + DELTA_X) - normX) <= Math.abs(normX - lockedX)) {
		lockedX += DELTA_X;
	}

	var normY = pos.y - START_Y;
	var lockedY = parseInt(normY / DELTA_Y) * DELTA_Y;

	if(Math.abs((lockedY + DELTA_Y) - normY) < Math.abs(normY - lockedY)) {
		lockedY += DELTA_Y;
	}

	//console.log('lockedx: ' + lockedX + ', ' + lockedY);

	saveState.push(canvas.toDataURL("image/png"));

	var newX = lockedX + START_X;
	var newY = lockedY + START_Y;

	var newPoint = {
		'x' : lockedX / DELTA_X,
		'y' : lockedY / DELTA_Y
	};

	console.log(point2String(newPoint));

	if(e.shiftKey) {
		if(marker !== undefined || marker !== null) {
			redraw();
			marker = null;
		}
		drawMarker(newPoint.x)
		marker = parseInt(newPoint.x);
	} else {
		if(!store.exists(newPoint)) {
			//savePoints.push({'x':lockedX / DELTA_X, 'y':lockedY / DELTA_Y});
			drawCircle(c, newX, newY, displaySetting.radius);
			store.add(newPoint);
			console.log(store.toString());
			console.log(store.count);
		} else {
			store.remove(newPoint);
			console.log('removing: ' + store.toString());
			console.log(store.count);
			redraw();
		}
	}
}

function redraw() {
	canvas.width = canvas.width;
	drawGrid();

	store.each(function(point) {
		drawCircle(c, point.x * DELTA_X + START_X, point.y * DELTA_Y + START_Y, displaySetting.radius);
	});
}

/*function undo() {
	var img = new Image();

	img.onload = function() {
		canvas.width = canvas.width;
		c.drawImage(img, 0, 0);

	};

	img.src = saveState.pop();

	savePoints.pop();
}*/

function getCoords(e) {
	var x;
	var y;
	if(e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	return {
		"x" : x,
		"y" : y
	};
}

function point2String(obj) {
	return '[' + obj.x + ", " + obj.y + ']';
}

function drawGrid() {
	
	var quarterNotesPerMeasure = 6;

	var HALF_HEIGHT = parseInt(canvas.height) / 2;
	// draw arc
	c.beginPath();
	c.arc(HALF_HEIGHT,HALF_HEIGHT ,HALF_HEIGHT,getRadians(270),getRadians(90), true);
	c.strokeStyle = "black";
	c.stroke();

	// draw triangle
	c.beginPath();
	// Start from the top-left point.
	var triangleStartX = 20;
	var triangleHeight = HALF_HEIGHT / 4;
	c.moveTo(triangleStartX, HALF_HEIGHT); // give the (x,y) coordinates
	c.lineTo(triangleStartX + triangleHeight, HALF_HEIGHT - triangleHeight/2);
	c.lineTo(triangleStartX + triangleHeight, HALF_HEIGHT + triangleHeight/2);
	c.fill();
	c.stroke();
	c.closePath();
	
	// do not draw rest of grid
	if (!DISPLAY_GRID) return;
	
	c.strokeStyle = 'black';
	c.lineWidth = 2;

	var nLcanvas = document.getElementById('notesLabel');
	var context = nLcanvas.getContext('2d');
	nLcanvas.width = nLcanvas.width;//alert($(canvas).position().top)
	nLcanvas.style.top = $(canvas).offset().top - document.body.scrollTop + 'px';

	var BARS = $('#measureCount').val();

	for(var i = 0; i <= NOTES_LINES; i++) {
		c.strokeStyle = (i == 8 || i == 4 || i == 6 || i == 10 || i == 12) ? 'green' : 'black';
		c.lineWidth = (i == 8 || i == 4 || i == 6 || i == 10 || i == 12) ? displaySetting.staffWidth : displaySetting.staffSmallWidth;
		c.beginPath();
		c.moveTo(0 + START_X, i * DELTA_Y + START_Y);
		c.lineTo(DELTA_X * BARS * quarterNotesPerMeasure * 2 + START_X, i * DELTA_Y + START_Y);
		c.stroke();

		var noteIndex = (i < 7) ? i : i - 7;
		//console.log(noteIndex + ' = ' + notes[noteIndex]);
		c.font = "8pt Calibri bold";
		c.fillText(notes[noteIndex], START_X - 15, i * DELTA_Y + START_Y + 5);

		context.font = "8pt Calibri bold";
		context.fillText(notes[noteIndex], 5, i * DELTA_Y + START_Y + 5);
	}

	// vertical lines
	var measureCount = 1;
	for(var i = 0; i < BARS * quarterNotesPerMeasure + 1; i++) {
		c.beginPath();
		c.moveTo(i * displaySetting.gridWidth + START_X, 0 + START_Y);
		c.lineTo(i * displaySetting.gridWidth + START_X, NOTES_LINES * DELTA_Y + START_Y);
		c.lineWidth = (i % quarterNotesPerMeasure == 0) ? 3 : 1; 
		c.stroke();

		if(i % (quarterNotesPerMeasure) == 0 && measureCount <= BARS) {
			c.fillText(measureCount, i * displaySetting.gridWidth + START_X - 2, START_Y - 8);
			measureCount++;
		}
	}
}

function drawImage() {
	var img = new Image();
	img.src = 'strip.png';
	img.onload = function(){
		
		c.drawImage(img,0,0);
	};
}

function doRefresh() {
	canvas.width = canvas.width;
	var factor = $('#factor').val();
	var newDisplayObj = {};
	for (var k in test_display) {
		if (test_display.hasOwnProperty(k)) {
			newDisplayObj[k] = test_display[k] * factor;
		}	
	}

	refresh(newDisplayObj);
}

function refresh(dspObj) {
	displaySetting = dspObj;
	START_X = displaySetting.start_x;
	START_Y = displaySetting.start_y;
	DELTA_X = displaySetting.delta_x;
	DELTA_Y = displaySetting.delta_y;
	RECT_HEIGHT = DELTA_Y * NOTES_LINES;
	
	canvas.height = displaySetting.canvas_height;	
	canvas.width = displaySetting.canvas_width;

	redraw();
}

function exportNotes() {
	document.getElementById('output').value = store.toString();
}

function doShiftRight() {
	if(marker === undefined || marker === null) {
		alert('Shift-click a column first.');
		return;
	}
	var confirmResult = prompt('Enter increment for column: ' + marker / 2 + '\nNOTE: There are 2 increments between vertical bars.');
	if(!confirmResult) return;
	var result = parseInt(confirmResult);

	store.shiftRight(marker, result);
	redraw();
	drawMarker(marker);
}

function drawMarker(x) {
	c.beginPath();
	c.lineWidth = 4;
	c.strokeStyle = "red";
	c.moveTo(x * DELTA_X + START_X, START_Y);
	c.lineTo(x * DELTA_X + START_X, NOTES_LINES * DELTA_Y + START_Y);
	c.stroke();
	
	document.getElementById('markerLabel').innerHTML = x;
}

function importNotes() {
	var txt = document.getElementById('output').value;
	
	if (txt == '') return;
	
	try {
		store = new MusicStore();
		
		var entries = txt.split('|');
		for (var i=0;i<entries.length;i++) {
			
			if (entries[i].length === 0) continue;
			console.log(entries[i]);
			var entry = entries[i];
			//entry = entry.replace('[','');
			//entry = entry.replace(']','');
			
			store.add({'x':trim(entry.split(',')[0]),
					   'y':trim(entry.split(',')[1])})
		}
		redraw();
		console.log('Done');
	}
	catch (jsError) {
		throw jsError;
	}
}

function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function copy() {
	if(marker === undefined || marker === null) {
		alert('Shift-click a column first.');
		return;
	}

	var result = prompt('Enter copy start and end marker using : as delimiter.');
	var start = parseInt(trim(result.split(':')[0]));
	var end = parseInt(trim(result.split(':')[1]));
	store.copy(start, end, marker);
	redraw();
}

/*function doPrint() {

	var PRINT_ROWS = 3;
	var printImage = canvas.toDataURL("image/png");
	for (var i=0;i<PRINT_ROWS;i++) {
		
		
		/*if (i === 0) { 
			canvasEl = $('#deebox') 
		} else {
			canvasEl = $('<canvas id="deebox'+i+'" ></canvas>');
			$('#canvasContainer').append(canvasEl);
		};


var canvasEl = $('<canvas id="deebox'+i+'" ></canvas>');
			$('#canvasContainer').append(canvasEl);

		canvasEl[0].height = displaySetting.canvas_height;	
		canvasEl[0].width = 1450;
		var img = new Image();
		
		//var img = new Image();
	
		/*img.onload = (function (index){
			return function(){
				//canvasEl[0].width = canvasEl[0].width;
				var WIDTH_PER_STRIP = 500;				
				var myContext = canvasEl[0].getContext('2d');
				myContext.drawImage(img,0,0);
				//myContext.drawImage(img, index * WIDTH_PER_STRIP, 0, WIDTH_PER_STRIP, displaySetting.canvas_height, 0, 0, WIDTH_PER_STRIP, displaySetting.canvas_height);
			}
			})(i);
			var myContext = canvasEl.get(0).getContext('2d');
			img.onload = function(){
				//canvasEl[0].width = canvasEl[0].width;
				var WIDTH_PER_STRIP = 500;				
				//console.log(canvasEl.id);
				myContext.drawImage(img,0,0);
				//myContext.drawImage(img, index * WIDTH_PER_STRIP, 0, WIDTH_PER_STRIP, displaySetting.canvas_height, 0, 0, WIDTH_PER_STRIP, displaySetting.canvas_height);
			};
		img.src = printImage;
	}
	

	//var img = canvas.toDataURL("image/png");
	//$('body').append('<img src="'+img+'"/>');
}*/

function doPrint() {
	var printImage = canvas.toDataURL("image/png");

	var WIDTH_PER_STRIP = 1500;
	
	var count = canvas.width / WIDTH_PER_STRIP;
	
	if (canvas.width % WIDTH_PER_STRIP > 0) count += 1;
	
	canvas.width = 1500;
	canvas.height = displaySetting.canvas_height * count;

	var arr = [];
	var OVERLAP_PX = displaySetting.gridWidth;
	var MEASURES_PER_STRIP = 10;
	
	for (var i=0;i<count;i++) {
		
		var img = new Image();
		arr.push(img);
		arr[i].onload = (function(i) {
			return function() {
			var startX = WIDTH_PER_STRIP * i;
			if (i !==0)	startX -= OVERLAP_PX;
			c.drawImage(arr[i], startX , 0, WIDTH_PER_STRIP, displaySetting.canvas_height, 
									  0, displaySetting.canvas_height * i, WIDTH_PER_STRIP, displaySetting.canvas_height);
			c.strokeRect(0, displaySetting.canvas_height * i,WIDTH_PER_STRIP,displaySetting.canvas_height);
			//alert('pause');
			}
		})(i);
		arr[i].src = printImage;
		
	}
}

function noteLabelHandler() {
	//console.log(document.body.scrollLeft);
	if (document.body.scrollLeft < START_X) {
		$('#notesLabel').hide();
	}
	else {
		$('#notesLabel').show();
	}
}

function toggleDisplayGrid() {
	DISPLAY_GRID = this.checked;
	doRefresh();
}
