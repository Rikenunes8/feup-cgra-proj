attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;


uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
  float timeScale = 0.01;
  float heightScale = 0.08;

  vec2 texture = aTextureCoord + vec2(timeFactor, timeFactor)*vec2(timeScale, timeScale);

  vec3 offset = aVertexNormal*texture2D(uSampler2, texture).r*heightScale;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}

