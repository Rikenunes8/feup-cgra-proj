import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
    	this.ang = 0;
    	this.pos = [0, 0, 0];
    	this.vel = 0;
	}

	update() {
    this.pos[0] += this.vel*Math.sin(this.ang);
		this.pos[2] += this.vel*Math.cos(this.ang);
  }
	
	initBuffers() {
		this.vertices = [
			-1, -1, 0,	//0
			 1, -1, 0,	//1
			-1,  1, 0, 	//2

      -1, -1, 0,	//0
			 1, -1, 0,	//1
			-1,  1, 0 	//2
		];
    
    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      0, 0, -1,
      0, 0, -1,
      0, 0, -1
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
