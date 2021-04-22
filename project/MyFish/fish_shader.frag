#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
  float size = 2.0;
  if (coords.y >= (size/2.0 - size*0.4))
    gl_FragColor =  vec4(1.0, 0.0, 0.0, 1.0);
  else
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}