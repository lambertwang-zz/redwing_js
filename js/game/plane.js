define(['object', 'point','crescent', 'util', 'three'], function(RwObject, Point, Crescent, util, THREE) {
    function Plane() {
    	RwObject.call(this);
        this.type = "plane";
        this.alignment = 0;
    	
    	var geo = new THREE.BoxGeometry(48, 16, 32, 1, 1, 1);
    	
        var mat = new THREE.ShaderMaterial({
                // map: bg_tex, 
                uniforms: {
                    in_color: {type: "v3", value: new THREE.Vector3(1.0, 0.0, 0.0)}
                },
                // attributes: attributes,
                vertexShader: document.getElementById('depth_shader_vert').textContent,
                fragmentShader: document.getElementById('depth_shader_frag').textContent
            });

        //material = new THREE.MeshDepthMaterial({wireframe: false});
        //material = new THREE.MeshNormalMaterial({wireframe: false});

        this.obj_mesh = new THREE.Mesh(geo, mat);
        this.obj_mesh.position.z = 32;
        util.scene.add(this.obj_mesh);

        this.camera_follow = true;
        this.verlet_movement = true;
        this.dir_control = true;

        this.obj_mesh.rotation.order = "ZXY";
    }

    Plane.prototype = Object.create(RwObject.prototype);

    Plane.prototype.draw = function() {
        // Makes the roll level out
        if (Math.abs(this.ori) < Math.PI/2) {
            if (Math.abs(this.roll) > 0.01) {
                this.roll -= util.signum(this.roll) * 0.02;
            }
        } else {
            if (Math.abs(this.roll) < Math.PI - 0.013) {
                this.roll += util.signum(this.roll) * 0.02;
            }
        }

        if (util.gameManager.step_count % 6 == 0) {
            new Point(
                60, this.x_pos, this.y_pos, 8, 
                util.hsltorgb(0, 0, (Math.random() + 1)/4.0)
                );
        }

        RwObject.prototype.draw.call(this);
    }

    Plane.prototype.collide = function(other_obj) {
    };

    return Plane;
});