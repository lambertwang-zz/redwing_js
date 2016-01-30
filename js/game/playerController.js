define(['object', 'util', 'game/bullet_0'], function(RwObject, util, Bullet0) {
    return {
        playerController: function(plane) {
        plane.fire_rate = 20;
        plane.fire_cooldown = 0;
        plane.alignment = 1;

        plane.tick = function() {
            if (util.key_status[38]) {
                this.x_last -= 0.9 * Math.cos(this.ori);
                this.y_last -= 0.9 * Math.sin(this.ori);

            }
            if (util.key_status[40]) {
                this.x_last += 0.6 * Math.cos(this.ori);
                this.y_last += 0.6 * Math.sin(this.ori);
            }
            if (util.key_status[37]) {
                this.ori += 0.04;
                this.roll += 0.04;
            }
            if (util.key_status[39]) {
                this.ori -= 0.04;
                this.roll -= 0.04;
            }
            if (util.key_status[90]) {
                if (this.fire_cooldown <= 0) {
                    this.fire_cooldown = this.fire_rate;
                    new Bullet0(this);

                }
            }
            if (this.fire_cooldown > 0) {
                this.fire_cooldown--;
            }

            RwObject.prototype.tick.call(this);
        }
    }};
});