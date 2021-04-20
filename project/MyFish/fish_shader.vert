attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 coords;
varying vec2 vTextureCoord;



void main() {
  coords = vec4(aVertexPosition, 1.0);
  vec4 vertex = uPMatrix * uMVMatrix * coords;
	gl_Position = vertex;

	vTextureCoord = aTextureCoord;

}