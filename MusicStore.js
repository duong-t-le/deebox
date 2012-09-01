
function MusicStore() {

	var data = {};
	this.count = 0;

	this.add = function(pos) {
		if (data[pos.x] === undefined) {
		// new
			data[pos.x] = [];
		}
		data[parseInt(pos.x)].push(parseInt(pos.y));
		this.count++;
	}
	
	this.toString = function() {
		var result = '';
		var count = 0;
		for (var k in data) {
			var x = k;
			
			for (var i=0;i<data[k].length;i++) {
				result += + x + ',' + data[k][i] + '|';
				count++;
			}
		}
		return result;
	}

	this.exists = function(pos) {
		var result = false;
		if (data[pos.x] === undefined) return false;

		for (var i=0;i<data[pos.x].length;i++) {
			if (parseInt(data[pos.x][i]) === parseInt(pos.y)) result = true;
		}

		return result;
	}

	this.remove = function(pos) {
		if (!this.exists(pos)) throw new Error (pos + ' does not exist');

		for (var i=0;i<data[pos.x].length;i++) {
			if (data[pos.x][i] === pos.y) {
				data[pos.x].splice(i, 1);
				break;
			}
		}
		
		if (data[pos.x].length === 0) delete data[pos.x];
		
		this.count--;
	
	}
	
	this.each = function(fn) {
		for (var k in data) {
			var x = k;
		
			for (var i=0;i<data[k].length;i++) {
				fn({'x':x,'y':data[k][i]});
			}
		}
	
	}
	
	this.shiftRight = function(col, inc) {
		var arr = this.getKeys();
		
		arr = arr.sort(function sortNumber(a,b){return b - a;});
		
		console.log("col: "+ col + " inc: " + inc);
		console.log("keys to shift: "+ arr);
		for (var i=0;i<arr.length;i++) {
			if (arr[i] >= col) {
				var colToMove = arr[i];
				data[colToMove + inc] = data[colToMove];
				delete data[colToMove]
			}
		}
		console.log(this.toString());
	}
	
	this.getKeys = function() {
		var result = [];
		for (var k in data) {
			result.push(parseInt(k));
		}
		
		return result.sort(function sortNumber(a,b){return a - b;});
	}
	
	this.copy = function(start, end, marker) {
		var arr = this.getKeys();
		try {
		arr = arr.sort();
		console.log("keys to copy: "+ arr);
		var delta = marker - start;
		
		// TODO: clear existing cols
		
		for (var i=0;i<arr.length;i++) {
			var key = arr[i];
			//if (data[delta + key] !== undefined) delete data[delta + key]; 
			console.log(delta + ", " + key);
			if (key >= start && key <= end) {
				data[delta + key] = data[key].slice(0);
				this.count += data[key].length;
			}
			
		}
		}
		catch (jsError) {
			throw jsError;
		}
	}

}