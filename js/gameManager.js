"use strict";

// Manages game logic
// apprx 64 tick
// Holy sh!t, the javascript timing functions are kinda screwy
define(['object', 'events', 'rwhitbox', 'util'], function(RwObject, RwEv, Hitbox, util) {

	function GameManager() {
		this.step_count = 0;

		// Used to record the duration of each 60 frame interval
		this.prev_time = new Date().getTime();
		this.start_time = new Date().getTime();
		this.target_time = new Date().getTime() + util.frame_time;
		// Additional framerate accuracy
		this.adjust_time = this.prev_time;
		this.fps = 0;

		this.objectList = {};
		this.additionList = {};
		this.removalList = {};

		this.clear_world = false;

		this.cellArray = new Array(util.bg_height*util.bg_width);
		for (var i = 0; i < util.bg_width; i++) {
			for (var j = 0; j < util.bg_height; j++) {
				this.cellArray[i + j * util.bg_width] = new Hitbox(i, j);
			}
		}
	}

	// Accepts world coordinates
	GameManager.prototype.getHitbox = function(x, y) {
		if (x > util.bg_size_x) {
			x -= util.bg_size_x;
		} else if (x < 0) {
			x += util.bg_size_x;
		}
		if (y > util.bg_size_y) {
			y -= util.bg_size_y;
		} else if (y < 0) {
			y += util.bg_size_y;
		}
		x = Math.floor(x / util.cell_size);
		y = Math.floor(y / util.cell_size);
		return this.cellArray[x + y * util.bg_width];
	};

	GameManager.prototype.removeObject = function(obj) {
	    if (!(obj.obj_id in this.removalList)) {
			this.removalList[obj.obj_id] = obj;
		}
	};

	GameManager.prototype.addObject = function(obj) {
		if (!(obj.obj_id in this.additionList)) {
			this.additionList[obj.obj_id] = obj;
		}
	};

	GameManager.prototype.clear = function() {
		this.clear_world = true;
	};

	GameManager.prototype.updateWorld = function() {
		for (var key in this.additionList) {
			if (this.additionList.hasOwnProperty(key)) {
				if (!(key in this.objectList)) {
					this.objectList[key] = this.additionList[key];
					delete this.additionList[key];
				}
			}
		}

		var eventStep = new RwEv("step");
		this.sendEvent(eventStep);
		
		for (var key in this.objectList) {
			if (this.objectList.hasOwnProperty(key)) {
				this.objectList[key].tick();
				this.objectList[key].updateHitboxes();
			}
		}

		for (var key in this.objectList) {
			if (this.objectList.hasOwnProperty(key)) {
				this.objectList[key].generateCollisions();
			}
		}

		for (var key in this.objectList) {
			if (this.objectList.hasOwnProperty(key)) {
				this.objectList[key].draw();
			}
		}

		for (var key in this.removalList) {
			if (this.removalList.hasOwnProperty(key)) {
				if (key in this.objectList) {
					delete this.objectList[key];
					this.removalList[key].kill();
					delete this.removalList[key];
				}
			}
		}

		if (this.clear_world) {
			for (var key in this.objectList) {
				if (this.objectList.hasOwnProperty(key)) {
					this.objectList[key].kill();
				}
			}
			this.objectList = {};
			this.additionList = {};
			this.removalList = {};
			this.clear_world = false;
		}
	};

	GameManager.prototype.mainLoop = function() {
		this.step_count += 1;
	    document.getElementById("game_ticks").innerHTML = this.step_count;

		// Game logic begins here
		this.updateWorld();
		// Game logic ends here

		var clock = new Date().getTime();
		// Adjust sleep time for additional framerate accuracy
		var sleep_time = this.target_time - clock;

		if (this.step_count % 60 == 0) {
			this.fps = 60*1000 / (clock-this.prev_time);
			document.getElementById("tps_counter").innerHTML = this.fps.toFixed(3);
			this.prev_time = clock;
		}

		if (sleep_time > 0){
			this.target_time = this.target_time + util.frame_time;
			setTimeout(function() { 
				util.gameManager.mainLoop(); 
			}, sleep_time);
		} else {
			clock = new Date().getTime();
			this.target_time = clock + util.frame_time;
			util.gameManager.mainLoop();
		}
	};

	GameManager.prototype.sendEvent = function(ev) {
		for (var key in this.objectList) {
			if (this.objectList.hasOwnProperty(key)) {
				this.objectList[key].receiveEvent(ev);
			}
		}
	};

	return GameManager;
});
