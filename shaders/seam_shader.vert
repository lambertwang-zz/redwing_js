uniform vec2 world_size;
varying vec2 vUv;

void main() {
	vUv = uv;

/*	vec3 temp_pos = vec3(position);

	if (cameraPosition.x - position.x > world_size.x / 2.0) {
		temp_pos.x += world_size.x;
	}
	/*else if (cameraPosition.x - position.x < -world_size.x/2) {
	//	position.x -= world_size.x/2;
	}
	if (cameraPosition.y - position.y > world_size.y/2) {
	//	position.y += world_size.y/2;
	} else if (cameraPosition.y - position.y < -world_size.y/2) {
	//	position.y -= world_size.y/2;
	}


	gl_Position = 
		projectionMatrix * 
		modelViewMatrix * 
		vec4(temp_pos, 1.0);
*/
	vec4 temp_pos = 
		projectionMatrix *
		modelViewMatrix * 
		vec4(position, 1.0);
	vec3 temp_pos2 = vec3(position);

	if (temp_pos.x > 3.0) {
		temp_pos2.x -= world_size.x;
		temp_pos2.z -= 1.0;
	} else if (temp_pos.x < -3.0) {
		temp_pos2.x += world_size.x;
		temp_pos2.z -= 1.0;
	}
	if (temp_pos.y > 3.0) {
		temp_pos2.y -= world_size.y;
		if (temp_pos2.z < -1.0) {
			temp_pos2.z -=1.0;
		}
	}
	if (temp_pos.y < -2.0) {
		//temp_pos2.y += 128.0;
	}
	// temp_pos2.y -= 1024.0;

	gl_Position =  
		projectionMatrix * 
		modelViewMatrix * 
		vec4(temp_pos2, 1.0);
}