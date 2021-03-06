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
    this.vertices = [];

    for (var _ = 0; _ < 3; _++) {
      this.vertices.push(-0.5, -0.5, -0.5) // 0 Left-Down-Back
      this.vertices.push( 0.5, -0.5, -0.5) // 1 Right-Down-Back
      this.vertices.push(-0.5,  0.5, -0.5) // 2 Left-Up-Back
      this.vertices.push( 0.5,  0.5, -0.5) // 3 Right-Up-Back
      this.vertices.push(-0.5, -0.5,  0.5) // 4 Left-Down-Front
      this.vertices.push( 0.5, -0.5,  0.5) // 5 Right-Down-Front
      this.vertices.push(-0.5,  0.5,  0.5) // 6 Left-Up-Front
      this.vertices.push( 0.5,  0.5,  0.5) // 7 Right-Up-Front

    }
    this.normals = [];
    for (var _ = 0; _ < 4; _++)
      this.normals.push(0, 0, -1);
    for (var _ = 0; _ < 4; _++)
      this.normals.push(0, 0, 1);
    for (var _ = 0; _ < 4; _++) {
      this.normals.push(-1, 0, 0);
      this.normals.push(1, 0, 0);
    }
    for (var _ = 0; _ < 2; _++) {
      this.normals.push(0, -1, 0);
      this.normals.push(0, -1, 0);
      this.normals.push(0, 1, 0);
      this.normals.push(0, 1, 0);
    }
    

		//Counter-clockwise reference of vertices
		this.indices = [
      // Back
			2, 1, 0,
      1, 2, 3,
      // Front
      4, 5, 6,
      6, 5, 7,
      // Up
      18, 22, 23,
      18, 23, 19,
      // Down
      20, 16, 21,
      21, 16, 17,
      // Left
      4, 6, 8,
      8, 6, 10,
      // Right
      9, 15, 13,
      9, 11, 15
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

