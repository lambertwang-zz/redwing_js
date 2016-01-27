"use strict";

// Manages game logic
// apprx 64 tick
// Holy sh!t, the javascript timing functions are kinda screwy
const frame_time = 15;

const cell_size = 16;
const bg_height = 64;
const bg_width = 128;
const bg_size_y = cell_size*bg_height;
const bg_size_x = cell_size*bg_width;

// True is down
var key_status = {
	38: false, // up
	37: false, // left
	39: false, // right
	40: false // down
}

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
}

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

	// Game logic begins here
	this.moveCamera();
	// Game logic ends here

	var clock = new Date().getTime();
	// Adjust sleep time for additional framerate accuracy
	var sleep_time = this.target_time - clock;

	if (this.step_count % 60 == 0) {
		this.fps = 60*1000 / (clock-this.prev_time);
		document.getElementById("fps_counter").innerHTML = this.fps.toFixed(3);
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
	if (camera.position.y > bg_size_y / 2) {
		camera.position.y -= bg_size_y;
	} else if (camera.position.y <  -bg_size_y / 2) {
		camera.position.y += bg_size_y;
	}
	if (camera.position.x > bg_size_x / 2) {
		camera.position.x -= bg_size_x;
	} else if (camera.position.x < -bg_size_x / 2) {
		camera.position.x += bg_size_x;
	}

};

GameManager.prototype.sendEvent = function(event) {

};

$(document).keydown(function(event) {
	key_status[event.which] = true;
});

$(document).keyup(function(event) {
	key_status[event.which] = false;
});
