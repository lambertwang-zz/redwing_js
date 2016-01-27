"use strict";
const draw_seams = true;

// Manages Graphics
function GraphicsManager(gameManager) {
	scene = new THREE.Scene();
	//camera = new THREE.PerspectiveCamera(75, 16.0/9.0, 64, 320);
    camera = new THREE.OrthographicCamera(-256, 256, 144, -144, 64, 320);
    camera.aspect = 16.0/9.0;
    camera.position.z = 256;

    geometry = new THREE.BoxGeometry(32, 32, 32, 8, 8, 8);
	//material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false});
    material = new THREE.MeshDepthMaterial({wireframe: false});

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = 32;
    scene.add(mesh);

    this.initBg();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerHeight * camera.aspect, window.innerHeight);

    document.getElementById("redwing").appendChild(renderer.domElement);
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
    var bg_tex = new THREE.DataTexture(
        this.bg_pixels, bg_width, bg_height, THREE.RGBFormat
        );
    bg_tex.wrapS = THREE.RepeatWrapping;
    bg_tex.wrapT = THREE.RepeatWrapping;
    bg_tex.repeat.set(2, 2);
    bg_tex.needsUpdate = true;
    var bg_mat = new THREE.MeshBasicMaterial({
        map: bg_tex,
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
        var seam_mat = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        this.seam = new THREE.Mesh(seam_geo, seam_mat);
        scene.add(this.seam);
    }
};

GraphicsManager.prototype.updateGraphics = function() {
};


GraphicsManager.prototype.resizeRenderer = function() {
    camera.aspect = 16.0/9.0;
    renderer.setSize(window.innerHeight * camera.aspect, window.innerHeight);
    camera.updateProjectionMatrix();
};

