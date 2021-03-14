import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, blue) {
		super(scene);
		this.initBuffers(blue);
	}
	
	initBuffers(blue) {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0, 	//2

      -1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0 	//2
		];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
    ]

    if (blue)
      this.texCoords = [
        0.00, 0.00,
        0.00, 0.50,
        0.25, 0.25,

        0.00, 0.00,
        0.00, 0.50,
        0.25, 0.25
      ]
    else
      this.texCoords = [
        0.25, 0.75,
        0.50, 0.50,
        0.75, 0.75,

        0.25, 0.75,
        0.50, 0.50,
        0.75, 0.75
      ]
      

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,

      5, 4, 3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
