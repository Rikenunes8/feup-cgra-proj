attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;
varying float brightOffset;

void main() {
  // By observe, the range of colors is aproximatelly between limInf and limSup (in percentage)
  float limSup = 0.55;
  float limInf = 0.25;

  float heightScale = 1.0;
  float bright = texture2D(uSampler2, aTextureCoord).r; // As the texture is in grayscale, RGB color's components are the same
  
  // Erase oultiers
  if      (bright > limSup) bright = limSup;
  else if (bright < limInf) bright = limInf;
  
  brightOffset = heightScale*(bright-limInf)/(limSup-limInf); // Linear Interpolation to offset be between 0 and 1
  
  vec3 offset = aVertexNormal*brightOffset; 

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}


