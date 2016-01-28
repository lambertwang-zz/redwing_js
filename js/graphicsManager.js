"use strict";

// Manages Graphics
function GraphicsManager(gameManager) {
    this.graphics_ticks = 0;

	scene = new THREE.Scene();
	//camera = new THREE.PerspectiveCamera(90, 16.0/9.0, 128, 288);
    //camera.position.z = 256;
    camera = new THREE.OrthographicCamera(
        -camera_width_cells*cell_size/2.0,  
        camera_width_cells*cell_size/2.0,  
        camera_width_cells*cell_size*9.0/32.0,  
        -camera_width_cells*cell_size*9.0/32.0,  
        64, 144);
    
    camera.aspect = 16.0/9.0;
    camera.position.z = 128;
    
    this.initBg();

    renderer = new THREE.WebGLRenderer({antialias: enable_aa});
    renderer.setSize(window.innerHeight * camera.aspect, window.innerHeight);

    document.getElementById("redwing").appendChild(renderer.domElement);

    this.particleList = {};
    this.additionList = {};
    this.removalList = {};
}

GraphicsManager.prototype.initBg = function() {
    // Number of cells, not pixels
    this.bg_pixels = new Uint8Array(bg_width * bg_height * 3);

    for (var i = 0; i < bg_width; i ++) {
        var temp = 359 * i / bg_width;
        for (var j = 0; j < bg_height; j++) {
            var rgb = hsltorgb((temp + (Math.random() * 30)) % 360, (Math.random() + 3)/4.0, (Math.random() + 2.5)/4.0);
            this.bg_pixels[(i + j * bg_width) * 3] = rgb[0];
            this.bg_pixels[(i + j * bg_width) * 3 + 1] = rgb[1];
            this.bg_pixels[(i + j * bg_width) * 3 + 2] = rgb[2];
        }
    }

    
    var bg_geo = new THREE.PlaneGeometry(
        2*bg_size_x, 2*bg_size_y,
        1, 1
        );
    this.bg_tex = new THREE.DataTexture(
        this.bg_pixels, bg_width, bg_height, THREE.RGBFormat
        );
    this.bg_tex.wrapS = THREE.RepeatWrapping;
    this.bg_tex.wrapT = THREE.RepeatWrapping;
    this.bg_tex.repeat.set(2, 2);
    this.bg_tex.needsUpdate = true;
    var bg_mat = new THREE.MeshBasicMaterial({
        map: this.bg_tex,
        wireframe: false
        });
    /*
    var bg_geo = new THREE.PlaneGeometry(
        bg_size_x, bg_size_y,
        4, 4
        );
    var bg_tex = new THREE.DataTexture(
        this.bg_pixels, bg_width, bg_height, THREE.RGBFormat
        );
    bg_tex.needsUpdate = true;
    var bg_mat = new THREE.ShaderMaterial({
            // map: bg_tex, 
            uniforms: {
                bg_tex: {type: 't', value: bg_tex},
                // world_size: {type: '2f', value: [bg_size_x, bg_size_y]}
                world_size: {type: "v2", value: new THREE.Vector2(bg_size_x, bg_size_y)}
            },
            // attributes: attributes,
            vertexShader: document.getElementById('seam_shader_vert').textContent,
            fragmentShader: document.getElementById('seam_shader_frag').textContent,
            wireframe: true
        });*/

    this.bg = new THREE.Mesh(bg_geo, bg_mat);
    scene.add(this.bg);

    if (draw_seams) {
        // Draws seams
        var seam_geo = new THREE.PlaneGeometry(bg_size_x, bg_size_y, 4, 4);
        var seam_mat = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true, wireframeLinewidth: 4});
        this.seam = new THREE.Mesh(seam_geo, seam_mat);
        scene.add(this.seam);
    }
};

GraphicsManager.prototype.updateGraphics = function() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    
    if (camera.position.y > bg_size_y / 2) {
        camera.position.y -= bg_size_y;
    } else if (camera.position.y <  -bg_size_y / 2) {
        camera.position.y += bg_size_y;
    }
    if (camera.position.x > bg_size_x / 2) {
        camera.position.x -= bg_size_x;
    } else if (camera.position.x < -bg_size_x / 2) {
        camera.position.x += bg_size_x;
    }
};


GraphicsManager.prototype.resizeRenderer = function() {
    camera.aspect = 16.0/9.0;
    renderer.setSize(window.innerHeight * camera.aspect, window.innerHeight);
    camera.updateProjectionMatrix();
};


GraphicsManager.prototype.removeParticle = function(part) {
    if (!(part.part_id in this.removalList)) {
        this.removalList[part.part_id] = part;
    }
};

GraphicsManager.prototype.addParticle = function(part) {
    if (!(part.part_id in this.additionList)) {
        this.additionList[part.part_id] = part;
    }
};

GraphicsManager.prototype.updateGraphics = function() {
    for (var key in this.additionList) {
        if (this.additionList.hasOwnProperty(key)) {
            if (!(key in this.particleList)) {
                this.particleList[key] = this.additionList[key];
                delete this.additionList[key];
            }
        }
    }

    for (var key in this.particleList) {
        if (this.particleList.hasOwnProperty(key)) {
            this.particleList[key].draw();
            if (this.particleList[key].lifespan <= 0) {
                this.removeParticle(this.particleList[key]);
            }
        }
    }

    for (var key in this.removalList) {
        if (this.removalList.hasOwnProperty(key)) {
            if (key in this.particleList) {
                delete this.particleList[key];
                this.removalList[key].kill();
                delete this.removalList[key];
            }
        }
    }
    this.graphics_ticks++;
    document.getElementById("graphics_ticks").innerHTML = this.graphics_ticks;
};

