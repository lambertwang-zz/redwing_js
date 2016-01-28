"use strict";
var part_id_iter = 0;

function RwParticle(lifespan) {
	this.x_pos = 0;
	this.y_pos = 0;
	this.ori = 0; // Orientation
	this.part_id = part_id_iter;
	part_id_iter++;
	graphicsManager.addParticle(this);

	this.part_mesh = undefined;

    this.lifespan = lifespan;
    this.max_lifespan = lifespan;
    this.life_pct = 1.0;
}

RwParticle.prototype.draw = function() {
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

	this.part_mesh.position.x = this.x_pos;
	this.part_mesh.position.y = this.y_pos;
	this.part_mesh.rotation.z = this.ori;

    if (camera.position.x - this.part_mesh.position.x > bg_size_x / 2) {
        this.part_mesh.position.x += bg_size_x;
    } else if (camera.position.x - this.part_mesh.position.x < -bg_size_x / 2) {
        this.part_mesh.position.x -= bg_size_x;
    }
    if (camera.position.y - this.part_mesh.position.y > bg_size_y / 2) {
        this.part_mesh.position.y += bg_size_y;
    } else if (camera.position.y - this.part_mesh.position.y < -bg_size_y / 2) {
        this.part_mesh.position.y -= bg_size_y;
    }

	if (this.camera_follow == true) {
		camera.position.x = this.part_mesh.position.x;
		camera.position.y = this.part_mesh.position.y;
	}
    this.lifespan--;
    this.life_pct = this.lifespan / this.max_lifespan;
};

RwParticle.prototype.kill = function() {
    scene.remove(this.part_mesh);
}

function Crescent(lifespan, x, y, p_size) {
	RwParticle.call(this, lifespan);
	
    this.x_pos = x;
    this.y_pos = y;
    this.ori = Math.random() * Math.PI * 2 - Math.PI;

	var geo = new THREE.PlaneGeometry(p_size, p_size, 1, 1);

    this.life_pct.needsUpdate = true;
    var rgb = hsltorgb(Math.random() * 360, (Math.random() + 7)/8.0, (Math.random() + 2)/4.0);
    this.cres_mat = new THREE.ShaderMaterial({
            // map: bg_tex, 
            uniforms: {
                in_color: {type: "v3", value: new THREE.Vector3(rgb[0]/255, rgb[1]/255, rgb[2]/255)},
                lifespan: {type: "f", value: this.life_pct}
            },
            // attributes: attributes,
            vertexShader: document.getElementById('crescent_vert').textContent,
            fragmentShader: document.getElementById('crescent_frag').textContent,
            transparent: true
        });

    //material = new THREE.MeshDepthMaterial({wireframe: false});
    //material = new THREE.MeshNormalMaterial({wireframe: false});

    this.part_mesh = new THREE.Mesh(geo, this.cres_mat);
    this.part_mesh.position.z = 32;
    scene.add(this.part_mesh);
}

Crescent.prototype = Object.create(RwParticle.prototype);

Crescent.prototype.draw = function() {
    this.cres_mat.uniforms.lifespan.value = this.life_pct;

    RwParticle.prototype.draw.call(this);
}
