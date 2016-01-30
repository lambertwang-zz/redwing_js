define(['object', 'point','crescent', 'util', 'three'], function(RwObject, Point, Crescent, util, THREE) {

    function Cuuube(x, y) {
    	RwObject.call(this);
        this.type = "cuuube";
    	
    	this.x_pos = x;
    	this.y_pos = y;

    	var geo = new THREE.BoxGeometry(32, 32, 32, 1, 1, 1);
        var mat = new THREE.ShaderMaterial({
                uniforms: {
                    in_color: {type: "v3", value: new THREE.Vector3(0.0, 0.0, 1.0)}
                },
                vertexShader: document.getElementById('depth_shader_vert').textContent,
                fragmentShader: document.getElementById('depth_shader_frag').textContent
            });

        this.obj_mesh = new THREE.Mesh(geo, mat);
        this.obj_mesh.position.z = 32;
        util.scene.add(this.obj_mesh);
    }

    Cuuube.prototype = Object.create(RwObject.prototype);

    Cuuube.prototype.updateHitboxes = function() {
        // Should be implemented by subclasses
        for (var key in this.hitboxes) {
            if (this.hitboxes.hasOwnProperty(key)) {
                this.hitboxes[key].removeObject(this);
            }
        }
        var new_hitboxes = {};

        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                var temp_hitbox = util.gameManager.getHitbox(this.x_pos + i*util.cell_size, this.y_pos + j*util.cell_size);
                temp_hitbox.addObject(this);
                new_hitboxes[temp_hitbox.hb_id] = temp_hitbox;
            }
        }
        
        this.hitboxes = new_hitboxes;
        this.collided = [String(this.obj_id)];
    };

    Cuuube.prototype.tick = function() {

        this.obj_mesh.rotation.x += 0.01;
        this.obj_mesh.rotation.y += 0.02;

    	RwObject.prototype.tick.call(this);
    }

    return Cuuube;
});