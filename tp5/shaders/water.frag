#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;


void main() {
  float timeScale = 0.01;
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor, timeFactor)*vec2(timeScale, timeScale));
	
	gl_FragColor = color;
}