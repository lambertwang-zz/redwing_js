"use strict";


define(['particle', 'util', 'three'], function(RwParticle, util, THREE) {

    function Point(lifespan, x, y, p_size, rgb) {
        RwParticle.call(this, lifespan);
        
        this.x_pos = x;
        this.y_pos = y;

        var geo = new THREE.CircleGeometry(p_size);
        geo.vertices.push(new THREE.Vector3(x, y, 16));
        
        this.point_mat = new THREE.MeshBasicMaterial({
                //map: point_map,
                color: new THREE.Color(rgb[0]/255, rgb[1]/255, rgb[2]/255),
                transparent: true
            });

        // this.part_mesh = new THREE.Points(geo);
        this.part_mesh = new THREE.Mesh(geo, this.point_mat);
        
        util.scene.add(this.part_mesh);
    }

    Point.prototype = Object.create(RwParticle.prototype);

    Point.prototype.draw = function() {
        this.part_mesh.material.opacity = this.life_pct;

        RwParticle.prototype.draw.call(this);
    }
    return Point;
});