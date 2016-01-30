"use strict";

define(['three', 'util'], function(THREE, util) {
    // Manages Graphics
    function GraphicsManager(gameManager) {
        this.graphics_ticks = 0;

    	util.scene = new THREE.Scene();

        util.camera = new THREE.OrthographicCamera(
            -util.camera_width_cells*util.cell_size/2.0,  
             util.camera_width_cells*util.cell_size/2.0,  
             util.camera_width_cells*util.cell_size*9.0/32.0,  
            -util.camera_width_cells*util.cell_size*9.0/32.0,  
            64, 144);
        
        util.camera.aspect = 16.0/9.0;
        util.camera.position.z = 128;
        
        this.initBg();

        util.renderer = new THREE.WebGLRenderer({antialias: util.enable_aa});
        util.renderer.setSize(window.innerHeight * util.camera.aspect, window.innerHeight);

        document.getElementById("redwing").appendChild(util.renderer.domElement);

        this.particleList = {};
        this.additionList = {};
        this.removalList = {};

    }

    GraphicsManager.prototype.initBg = function() {
        // Number of cells, not pixels
        this.bg_pixels = new Uint8Array(util.bg_width * util.bg_height * 3);

        for (var i = 0; i < util.bg_width; i ++) {
            var temp = 359 * i / util.bg_width;
            for (var j = 0; j < util.bg_height; j++) {
                var rgb = util.hsltorgb((temp + (Math.random() * 30)) % 360, (Math.random() + 3)/4.0, (Math.random() + 2.5)/4.0);
                this.bg_pixels[(i + j * util.bg_width) * 3] = rgb[0];
                this.bg_pixels[(i + j * util.bg_width) * 3 + 1] = rgb[1];
                this.bg_pixels[(i + j * util.bg_width) * 3 + 2] = rgb[2];
            }
        }
        
        var bg_geo = new THREE.PlaneGeometry(2*util.bg_size_x, 2*util.bg_size_y, 1, 1);
        this.bg_tex = new THREE.DataTexture(this.bg_pixels, util.bg_width, util.bg_height, THREE.RGBFormat);
        this.bg_tex.wrapS = THREE.RepeatWrapping;
        this.bg_tex.wrapT = THREE.RepeatWrapping;
        this.bg_tex.repeat.set(2, 2);
        this.bg_tex.needsUpdate = true;

        var bg_mat = new THREE.MeshBasicMaterial({
            map: this.bg_tex,
            wireframe: false
            });
        
        this.bg = new THREE.Mesh(bg_geo, bg_mat);
        util.scene.add(this.bg);

        if (util.draw_seams) {
            // Draws seams
            var seam_geo = new THREE.PlaneGeometry(util.bg_size_x, util.bg_size_y, 4, 4);
            var seam_mat = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true, wireframeLinewidth: 4});
            this.seam = new THREE.Mesh(seam_geo, seam_mat);
            util.scene.add(this.seam);
        }
    };

    GraphicsManager.prototype.resizeRenderer = function() {
        util.camera.aspect = 16.0/9.0;
        util.renderer.setSize(window.innerHeight * util.camera.aspect, window.innerHeight);
        util.camera.updateProjectionMatrix();
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

    return GraphicsManager;
});
