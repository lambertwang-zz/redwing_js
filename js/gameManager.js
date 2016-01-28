"use strict";

// Manages game logic
// apprx 64 tick
// Holy sh!t, the javascript timing functions are kinda screwy


function GameManager() {
	this.game_over = false;
	this.step_count = 0;

	// Used to record the duration of each 60 frame interval
	this.prev_time = new Date().getTime();
	this.start_time = new Date().getTime();
	this.target_time = new Date().getTime() + frame_time;
	// Additional framerate accuracy
	this.adjust_time = this.prev_time;
	this.fps = 0;

	this.objectList = {};
	this.additionList = {};
	this.removalList = {};

	this.cellArray = new Array(bg_height*bg_width);
	for (var i = 0; i < bg_width; i++) {
		for (var j = 0; j < bg_height; j++) {
			this.cellArray[i + j * bg_width] = new Hitbox(i, j);
		}
	}
}

// Accepts world coordinates
GameManager.prototype.getHitbox = function(x, y) {
	if (x > bg_size_x) {
		x -= bg_size_x;
	} else if (x < 0) {
		x += bg_size_x;
	}
	if (y > bg_size_y) {
		y -= bg_size_y;
	} else if (y < 0) {
		y += bg_size_y;
	}
	x = Math.floor(x / cell_size);
	y = Math.floor(y / cell_size);
	return this.cellArray[x + y * bg_width];
};

GameManager.prototype.mainLoop = function() {
	var clock = new Date().getTime();
	var frame_start_time = clock;
	this.step_count += 1;
	
	// Game logic begins here
	

	// Game logic ends here

	clock = new Date().getTime();
	if (this.step_count % 60 == 0) {
		this.fps = 60*1000 / (clock-this.prev_time);
		document.getElementById("fps_counter").innerHTML = this.fps.toFixed(3);
		this.prev_time = clock;
	}

	clock = new Date().getTime();
	// Adjust sleep time for additional framerate accuracy
	var loop_time = clock - frame_start_time;
	var sleep_time = frame_time - loop_time;

	if (sleep_time > 0){
		setTimeout(gameLoop, sleep_time);
	} else {
		gameLoop();
	}
};

GameManager.prototype.mainLoop2 = function() {
	var clock = new Date().getTime();
	var sleep_adjust = frame_time - (clock-this.start_time);
	this.start_time = clock;
	this.step_count += 1;

	// Game logic begins here
	this.moveCamera();
	// Game logic ends here

	clock = new Date().getTime();

	// Adjust sleep time for additional framerate accuracy
	var sleep_time = frame_time - (clock - this.start_time) + sleep_adjust;

	if (this.step_count % 60 == 0) {
		this.fps = 60*1000 / (clock-this.prev_time);
		document.getElementById("fps_counter").innerHTML = this.fps.toFixed(3);
		this.prev_time = clock;
	}

	if (sleep_time > 0){
		setTimeout(gameLoop2, sleep_time);
	} else {
		gameLoop2();
	}
};

GameManager.prototype.mainLoop3 = function() {
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
		this.target_time = this.target_time + frame_time;
		setTimeout(gameLoop3, sleep_time);
	} else {
		clock = new Date().getTime();
		this.target_time = clock + frame_time;
		gameLoop3();
	}
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

GameManager.prototype.updateWorld = function() {
	for (var key in this.additionList) {
		if (this.additionList.hasOwnProperty(key)) {
			if (!(key in this.objectList)) {
				this.objectList[key] = this.additionList[key];
				delete this.additionList[key];
			}
		}
	}
	
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
};

GameManager.prototype.moveCamera = function() {
	if (key_status[38]) {
		camera.position.y += 4;
	}
	if (key_status[40]) {
		camera.position.y -= 4;
	}
	if (key_status[37]) {
		camera.position.x -= 4;
	}
	if (key_status[39]) {
		camera.position.x += 4;
	}
};

GameManager.prototype.sendEvent = function(event) {

};
