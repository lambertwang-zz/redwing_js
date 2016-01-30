"use strict";

define(['three', 'util'], function(THREE, util) {
    var part_id_iter = 0;

    function RwParticle(lifespan) {
    	this.part_id = part_id_iter;
    	part_id_iter++;
    	util.graphicsManager.addParticle(this);

        this.x_pos = 0;
        this.y_pos = 0;
        
    	this.part_mesh = undefined;

        this.lifespan = lifespan;
        this.max_lifespan = lifespan;
        this.life_pct = 1.0;
    }

    RwParticle.prototype.draw = function() {
        if (this.x_pos > util.bg_size_x / 2) {
            this.x_pos -= util.bg_size_x;
        } else if (this.x_pos < -util.bg_size_x / 2) {
            this.x_pos += util.bg_size_x;
        }
        if (this.y_pos > util.bg_size_y / 2) {
            this.y_pos -= util.bg_size_y;
        } else if (this.y_pos <  -util.bg_size_y / 2) {
            this.y_pos += util.bg_size_y;
        }

    	this.part_mesh.position.x = this.x_pos;
    	this.part_mesh.position.y = this.y_pos;

        if (util.camera.position.x - this.part_mesh.position.x > util.bg_size_x / 2) {
            this.part_mesh.position.x += util.bg_size_x;
        } else if (util.camera.position.x - this.part_mesh.position.x < -util.bg_size_x / 2) {
            this.part_mesh.position.x -= util.bg_size_x;
        }
        if (util.camera.position.y - this.part_mesh.position.y > util.bg_size_y / 2) {
            this.part_mesh.position.y += util.bg_size_y;
        } else if (util.camera.position.y - this.part_mesh.position.y < -util.bg_size_y / 2) {
            this.part_mesh.position.y -= util.bg_size_y;
        }

        this.lifespan--;
        this.life_pct = this.lifespan / this.max_lifespan;
    };

    RwParticle.prototype.kill = function() {
        util.scene.remove(this.part_mesh);
    }

    return RwParticle;
});