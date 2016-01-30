"use strict";

define(function() {
	var hb_id_iter = 0;

	function Hitbox(x, y) {
		this.hb_id = hb_id_iter;
		hb_id_iter++;

		this.x_cell = x;
		this.y_cell = y;
		this.contents = {};
	}

	Hitbox.prototype.addObject = function(obj) {
		if (!(obj.obj_id in this.contents)) {
			this.contents[obj.obj_id] = obj;
		}
	};

	Hitbox.prototype.removeObject = function(obj) {
		if (obj.obj_id in this.contents) {
			delete this.contents[obj.obj_id];
		}
	};

	Hitbox.prototype.clearObject = function() {
		this.contents = {};
	};

	return Hitbox;
});
