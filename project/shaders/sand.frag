#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float brightOffset;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;


void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	// Shadow with mapping texture
	vec4 colorShadowed = color;
	colorShadowed.r *= brightOffset;
	colorShadowed.g *= brightOffset;
	colorShadowed.b *= brightOffset;


	gl_FragColor = colorShadowed;
}