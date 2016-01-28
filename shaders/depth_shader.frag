uniform vec3 in_color;

varying vec4 vert_position;

void main() {

	// float mult = vert_position.z / vert_position.w;
	float mult = 0.3;
	// float mult = (position.z - camera_planes.x) / (camera_planes.y - camera_planes.x);
	
	gl_FragColor = vec4(
		in_color.r * mult,
		in_color.g * mult,
		in_color.b * mult, 
		1.0
		);
}
