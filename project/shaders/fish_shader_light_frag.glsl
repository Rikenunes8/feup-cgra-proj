#version 300 es
precision highp float;

in vec4 vFinalColor;
in vec2 vTextureCoord;
in vec4 coords;

out vec4 fragColor;


uniform sampler2D uSampler;

uniform bool uUseTexture;

void main() {
	// Branching should be reduced to a minimal. 
	// When based on a non-changing uniform, it is usually optimized.
	if (uUseTexture)
	{
		float size = 2.0;
		vec4 textureColor = texture(uSampler, vTextureCoord);
		if (coords.y >= (size/2.0 - size*0.4))
			fragColor =  vec4(0.8, 0.0, 0.0, 1.0) * vFinalColor;
		else
			fragColor = textureColor * vFinalColor;
	}
	else
		fragColor = vFinalColor;

}