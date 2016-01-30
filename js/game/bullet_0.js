define(['object', 'util', 'three'], function(RwObject, util, THREE) {
    function Bullet0(shooter) {
    	RwObject.call(this);
        this.type = "bullet_0";
        this.alignment = shooter.alignment;

        this.x_pos = shooter.x_pos;
        this.y_pos = shooter.y_pos;

        this.x_vel = shooter.x_pos - shooter.x_last;
        this.y_vel = shooter.y_pos - shooter.y_last;
        this.ori = shooter.ori;
    	
    	var geo = new THREE.BoxGeometry(24, 8, 8, 1, 1, 1);

        var mat = new THREE.MeshBasicMaterial({
                color: "#ffff00"
            });


        this.obj_mesh = new THREE.Mesh(geo, mat);
        this.obj_mesh.position.z = 32;
        util.scene.add(this.obj_mesh);

        this.dir_control = true;
        this.lifespan = 40;

        this.obj_mesh.rotation.order = "ZXY";
    }

    Bullet0.prototype = Object.create(RwObject.prototype);

    Bullet0.prototype.draw = function() {
        RwObject.prototype.draw.call(this);
    }
    
    Bullet0.prototype.tick = function() {
        this.lifespan--;
        if (this.lifespan <= 0) {
            util.gameManager.removeObject(this);
        }

        this.x_pos += 12.0 * Math.cos(this.ori) + this.x_vel;
        this.y_pos += 12.0 * Math.sin(this.ori) + this.y_vel;

        RwObject.prototype.tick.call(this);
    }

    Bullet0.prototype.collide = function(other_obj) {
        if (other_obj.type == "cuuube") {
            util.gameManager.removeObject(other_obj);
            util.gameManager.removeObject(this);
        }
    };

    return Bullet0;
});