"use strict";


define(['particle', 'util', 'three'], function(RwParticle, util, THREE) {

    function Crescent(lifespan, x, y, p_size, rgb) {
    	RwParticle.call(this, lifespan);
    	
        this.x_pos = x;
        this.y_pos = y;

    	var geo = new THREE.PlaneGeometry(p_size, p_size, 1, 1);

        this.cres_mat = new THREE.ShaderMaterial({
                uniforms: {
                    in_color: {type: "v3", value: new THREE.Vector3(rgb[0]/255, rgb[1]/255, rgb[2]/255)},
                    lifespan: {type: "f", value: this.life_pct}
                },
                vertexShader: document.getElementById('crescent_vert').textContent,
                fragmentShader: document.getElementById('crescent_frag').textContent,
                transparent: true
            });

        this.part_mesh = new THREE.Mesh(geo, this.cres_mat);
        this.part_mesh.position.z = 16;
        this.part_mesh.rotation.z = Math.random() * Math.PI * 2 - Math.PI;
        util.scene.add(this.part_mesh);
    }

    Crescent.prototype = Object.create(RwParticle.prototype);

    Crescent.prototype.draw = function() {
        this.cres_mat.uniforms.lifespan.value = this.life_pct;

        RwParticle.prototype.draw.call(this);
    }
    return Crescent;
});
