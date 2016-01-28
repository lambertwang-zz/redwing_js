varying vec4 vert_position;

void main() {
	vert_position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
 
	gl_Position = vert_position;
}
