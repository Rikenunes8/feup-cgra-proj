#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float brightOffset;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;


void main() {
  float timeScale = 0.005;
  float scale = 0.5;
  vec2 movedTextureCoord = vTextureCoord + vec2(timeFactor, timeFactor)*vec2(timeScale, timeScale);
  vec4 colorMap = texture2D(uSampler2, movedTextureCoord);
  float sOffset = (colorMap.r - 0.5)*scale;
  float tOffset = (colorMap.g - 0.5)*scale;

	vec4 colorTex = texture2D(uSampler, vTextureCoord+vec2(sOffset, tOffset));

	gl_FragColor = colorTex;
}