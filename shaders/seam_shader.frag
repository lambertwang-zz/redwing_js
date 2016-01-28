varying vec2 vUv;
uniform sampler2D bg_tex;

void main() {  
	gl_FragColor = texture2D(bg_tex, vUv);
}