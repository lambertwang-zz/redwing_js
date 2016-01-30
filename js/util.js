"use strict";

define(['jquery'], function($) {
	console.log("adsdfgg");
	var util_module = {
		frame_time: 15,
		cell_size: 16,
		bg_height: 128,
		bg_width: 256,
		bg_size_y: null,
		bg_size_x: null,
		camera_width_cells: 48,
		draw_seams: true,
		enable_aa: true,
		scene: null,
		camera: null,
		renderer: null,
		gameManager: null,
		graphicsManager: null,
		networkManager: null,
		key_status: { // True is down
			"-1": false, // Left Mouse
		    "-2": false, // Middle Mouse
		    "-3": false, // Right Mouse
			38: false, // up
			37: false, // left
			39: false, // right
			40: false, // down
			67: false, // c
			88: false, // x
			90: false // z
		},

		hsltorgb: function(h, s, l) {
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
		},

		rgbtohsl: function(r, g, b) {
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
		},

		signum: function(num) {
			return (num == 0 ? 0 : (num > 0.0 ? 1.0 : -1.0)); 
		}
	};
	util_module.bg_size_y = util_module.cell_size*util_module.bg_height;
	util_module.bg_size_x = util_module.cell_size*util_module.bg_width;

	$(document).keydown(function(event) {
		util_module.key_status[event.which] = true;
	});

	$(document).keyup(function(event) {
		util_module.key_status[event.which] = false;
	});

	$(document).mousedown(function(event) {
		util_module.key_status[-event.which] = true;
	});

	$(document).mouseup(function(event) {
		util_module.key_status[-event.which] = false;
	});

	return util_module;
});
