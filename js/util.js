"use strict";

const frame_time = 15;

const cell_size = 16;
const bg_height = 128;
const bg_width = 256;
const bg_size_y = cell_size*bg_height;
const bg_size_x = cell_size*bg_width;
const camera_width_cells = 48;

const draw_seams = true;
const enable_aa = true;

var scene, camera, renderer

var gameManager;
var graphicsManager;

// True is down
var key_status = {
	38: false, // up
	37: false, // left
	39: false, // right
	40: false, // down
	67: false, // c
	88: false, // x
	90: false // z
}

$(document).keydown(function(event) {
	key_status[event.which] = true;
});

$(document).keyup(function(event) {
	key_status[event.which] = false;
});

function hsltorgb (h, s, l) {
	var c = (1 - Math.abs(2*l - 1)) * s;
	var x = c * (1- Math.abs(((h / 60) % 2) - 1.0))
	var m = l - c/2;

	var r = [0, 0, 0];
	
	if (h >= 0 && h < 60) {
		r = [c, x, 0];
	} else if (h >= 60 && h < 120) {
		r = [x, c, 0];
	} else if (h >= 120 && h < 180) {
		r = [0, c, x];
	} else if (h >= 180 && h < 240) {
		r = [0, x, c];
	} else if (h >= 240 && h < 300) {
		r = [x, 0, c];
	} else if (h >= 300 && h < 360) {
		r = [c, 0, x];
	}
	return [
		Math.min(255, Math.round((r[0]+m)*255)), 
		Math.min(255, Math.round((r[1]+m)*255)), 
		Math.min(255, Math.round((r[2]+m)*255))
		];
}
function rgbtohsl (r, g, b) {
	var rp = r/255;
	var gp = g/255;
	var bp = b/255;
	var cmax = Math.max(rp, gp, bp);
	var cmin = Math.min(rp, gp, bp);
	var delta = cmax - cmin;
	var hue = 0;
	if (delta == 0) {
		hue = 0;
	} else if (cmax == rp) {
		hue = 60 * (((gp-bp)/delta) % 6);
	} else if (cmax == gp) {
		hue = 60 * (((bp-rp)/delta + 2) % 6);
	} else if (cmax == bp) {
		hue = 60 * (((rp-gp)/delta + 4) % 6);
	}
	var lit = (cmax + cmin) / 2;
	var sat = 0;
	if (delta == 0) {
		sat = 0;
	} else {
		sat = delta / (1- Math.abs(2 * lit - 1));
	}
	return [Math.round(hue), Math.round(sat), Math.round(lit)];
}

function signum(num) {
	return (num == 0 ? 0 : (num > 0.0 ? 1.0 : -1.0)); 
}
