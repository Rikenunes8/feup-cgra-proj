import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
    this.vertices = [
			0, 0, 0,	//0
			1, 1, 0,	//1
      2, 0, 0,  //2
      3, 1, 0,   //3

      0, 0, 0,	//0
			1, 1, 0,	//1
      2, 0, 0,  //2
      3, 1, 0   //3
		];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1
    ]

    this.texCoords = [
      0.25, 0.75,
      0.50, 1.00,
      0.75, 0.75,
      1.00, 1.00,

      0.25, 0.75,
      0.50, 1.00,
      0.75, 0.75,
      1.00, 1.00
    ]

		//Counter-clockwise reference of vertices
		this.indices = [
      // Side 1
			1, 0, 2,
      1, 2, 3,
      // Side 2
      6, 4, 5,
      7, 6, 5
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
