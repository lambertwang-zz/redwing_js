"use strict";
var obj_id_iter = 0;

function RwObject() {
	this.x_pos = 0;
	this.y_pos = 0;
	this.ori = 0; // Orientation
	this.obj_id = obj_id_iter;
	obj_id_iter++;
	gameManager.addObject(this);

	this.obj_mesh = undefined;

	this.camera_follow = false;
}

RwObject.prototype.draw = function() {
	this.obj_mesh.position.x = this.x_pos;
	this.obj_mesh.position.y = this.y_pos;
	this.obj_mesh.rotation.z = this.ori;


	if (this.camera_follow == true) {
		camera.position.x = this.obj_mesh.position.x;
		camera.position.y = this.obj_mesh.position.y;
	}

    if (camera.position.x - this.obj_mesh.position.x > bg_size_x / 2) {
        this.obj_mesh.position.x += bg_size_x;
    } else if (camera.position.x - this.obj_mesh.position.x < -bg_size_x / 2) {
        this.obj_mesh.position.x -= bg_size_x;
    }
    if (camera.position.y - this.obj_mesh.position.y > bg_size_y / 2) {
        this.obj_mesh.position.y += bg_size_y;
    } else if (camera.position.y - this.obj_mesh.position.y < -bg_size_y / 2) {
        this.obj_mesh.position.y -= bg_size_y;
    }
};

RwObject.prototype.tick = function() {
    if (this.x_pos > bg_size_x / 2) {
        this.x_pos -= bg_size_x;
    } else if (this.x_pos < -bg_size_x / 2) {
        this.x_pos += bg_size_x;
    }
    if (this.y_pos > bg_size_y / 2) {
        this.y_pos -= bg_size_y;
    } else if (this.y_pos <  -bg_size_y / 2) {
        this.y_pos += bg_size_y;
    }
    if (this.ori > Math.PI) {
    	this.ori -= 2 * Math.PI;
	} else if (this.ori > Math.PI) {
    	this.ori += 2 * Math.PI;
    }
    
};

RwObject.prototype.kill = function() {
	scene.remove(this.obj_mesh);
}

function Plane() {
	RwObject.call(this);
	
	var geo = new THREE.BoxGeometry(32, 32, 32, 1, 1, 1);
	
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
    scene.add(this.obj_mesh);

    this.camera_follow = true;
}

Plane.prototype = Object.create(RwObject.prototype);

Plane.prototype.tick = function() {
	if (key_status[38]) {
		this.x_pos += 12 * Math.cos(this.ori);
		this.y_pos += 12 * Math.sin(this.ori);
	}
	if (key_status[40]) {
		this.x_pos -= 12 * Math.cos(this.ori);
		this.y_pos -= 12 * Math.sin(this.ori);
	}
	if (key_status[37]) {
		this.ori += 0.04;
	}
	if (key_status[39]) {
		this.ori -= 0.04;
	}

	if (gameManager.step_count % 6 == 0) {
		new Crescent(10, this.x_pos, this.y_pos, 32);
	}

	RwObject.prototype.tick.call(this);
}


function Cuuube(x, y) {
	RwObject.call(this);
	
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
    scene.add(this.obj_mesh);
}

Cuuube.prototype = Object.create(RwObject.prototype);

Cuuube.prototype.tick = function() {

    this.obj_mesh.rotation.x += 0.01;
    this.obj_mesh.rotation.y += 0.02;

	RwObject.prototype.tick.call(this);
}
