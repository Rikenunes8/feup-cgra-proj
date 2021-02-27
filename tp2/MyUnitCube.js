import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5, // 0 Left-Down-Back
       0.5, -0.5, -0.5, // 1 Right-Down-Back
      -0.5,  0.5, -0.5, // 2 Left-Up-Back
       0.5,  0.5, -0.5, // 3 Right-Up-Back
      -0.5, -0.5,  0.5, // 4 Left-Down-Top
       0.5, -0.5,  0.5, // 5 Right-Down-Top
      -0.5,  0.5,  0.5, // 6 Left-Up-Top
       0.5,  0.5,  0.5  // 7 Right-Up-Top
		];

		//Counter-clockwise reference of vertices
		this.indices = [
      // Back
			2, 1, 0,
      1, 2, 3,
      // Front
      7, 6, 5,
      5, 6, 4,
      // Up
      7, 3, 6,
      6, 3, 2,
      // Down
      5, 4, 1,
      1, 4, 0,
      // Left
      4, 6, 0,
      0, 6, 2,
      // Right
      1, 7, 5,
      1, 3, 7
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

