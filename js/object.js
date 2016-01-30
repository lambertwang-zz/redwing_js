"use strict";


define(['object', 'util'], function(RwObject, util) {
    const friction = 0.9;

    var obj_id_iter = 0;

    function RwObject() {
        this.obj_id = obj_id_iter;
        obj_id_iter++;
        util.gameManager.addObject(this);
        this.type = "RwObject";

    	this.x_pos = 0.0;
    	this.y_pos = 0.0;
        this.x_last = 0.0;
        this.y_last = 0.0;

    	this.ori = 0.0; // Orientation
        this.roll = 0.0;
        this.pitch = 0.0;

    	this.obj_mesh = undefined;

    	this.camera_follow = false;

        this.verlet_movement = false;
        this.dir_control = false;

        // List of world cells
        this.hitboxes = {};
        // List of objects already collided with
        this.collided = [];
        
    }

    RwObject.prototype.draw = function() {
    	this.obj_mesh.position.x = this.x_pos;
    	this.obj_mesh.position.y = this.y_pos;

        if (this.dir_control) {
            this.obj_mesh.rotation.z = this.ori;
            this.obj_mesh.rotation.x = this.roll;
            this.obj_mesh.rotation.y = this.pitch;
        }

    	if (this.camera_follow == true) {
    		util.camera.position.x = this.x_pos;
    		util.camera.position.y = this.y_pos;
    	}

        if (util.camera.position.x - this.obj_mesh.position.x > util.bg_size_x / 2) {
            this.obj_mesh.position.x += util.bg_size_x;
        } else if (util.camera.position.x - this.obj_mesh.position.x < -util.bg_size_x / 2) {
            this.obj_mesh.position.x -= util.bg_size_x;
        }
        if (util.camera.position.y - this.obj_mesh.position.y > util.bg_size_y / 2) {
            this.obj_mesh.position.y += util.bg_size_y;
        } else if (util.camera.position.y - this.obj_mesh.position.y < -util.bg_size_y / 2) {
            this.obj_mesh.position.y -= util.bg_size_y;
        }
    };

    // All modifications to the position and direction of the object should occur here. 
    RwObject.prototype.tick = function() {
        if (this.verlet_movement) {
            var x_delta = friction * (this.x_pos - this.x_last);
            var y_delta = friction * (this.y_pos - this.y_last);
            this.x_last = this.x_pos;
            this.y_last = this.y_pos;
            this.x_pos += x_delta;
            this.y_pos += y_delta;
        }


        if (this.x_pos > util.bg_size_x / 2) {
            this.x_pos -= util.bg_size_x;
            this.x_last -= util.bg_size_x;
        } else if (this.x_pos < -util.bg_size_x / 2) {
            this.x_pos += util.bg_size_x;
            this.x_last += util.bg_size_x;
        }
        if (this.y_pos > util.bg_size_y / 2) {
            this.y_pos -= util.bg_size_y;
            this.y_last -= util.bg_size_y;
        } else if (this.y_pos <  -util.bg_size_y / 2) {
            this.y_pos += util.bg_size_y;
            this.y_last += util.bg_size_y;
        }
        if (this.dir_control) {
            if (this.ori > Math.PI) {
            	this.ori -= 2 * Math.PI;
        	} else if (this.ori < -Math.PI) {
            	this.ori += 2 * Math.PI;
            }
            if (this.roll > Math.PI) {
                this.roll -= 2 * Math.PI;
            } else if (this.roll < -Math.PI) {
                this.roll += 2 * Math.PI;
            }
        }
    };

    RwObject.prototype.updateHitboxes = function() {
        // Should be implemented by subclasses
        for (var key in this.hitboxes) {
            if (this.hitboxes.hasOwnProperty(key)) {
                this.hitboxes[key].removeObject(this);
            }
        }
        var new_hitboxes = {};
        var center_hitbox = util.gameManager.getHitbox(this.x_pos, this.y_pos);
        center_hitbox.addObject(this);
        new_hitboxes[center_hitbox.hb_id] = center_hitbox
        this.hitboxes = new_hitboxes;
        this.collided = [String(this.obj_id)];
    };

    RwObject.prototype.addHitbox = function(hb) {
        if (!(hb.hb_id in this.hitboxes)) {
            this.hitboxes[hb.hb_id] = hb;
        }
    };

    RwObject.prototype.generateCollisions = function() {
        for (var key in this.hitboxes) {
            if (this.hitboxes.hasOwnProperty(key)) {
                var check_hitbox = this.hitboxes[key].contents;
                for (var obj_key in check_hitbox) {
                    if (check_hitbox.hasOwnProperty(obj_key)) {
                        if (this.collided.indexOf(obj_key) > -1) {
                            // Object already collided
                        } else {
                            this.collided.push(obj_key);
                            this.collide(check_hitbox[obj_key]);
                        }
                    }
                }
            }
        }
    };

    RwObject.prototype.receiveEvent = function(ev) {
        // To be implemented by subclasses
    };


    RwObject.prototype.collide = function(other_obj) {
        // To be implemented by subclasses
    };

    RwObject.prototype.kill = function() {
        for (var key in this.hitboxes) {
            if (this.hitboxes.hasOwnProperty(key)) {
                this.hitboxes[key].removeObject(this);
            }
        }
    	util.scene.remove(this.obj_mesh);
    }

    return RwObject;
});
