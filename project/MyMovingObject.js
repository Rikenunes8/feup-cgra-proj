import {CGFobject} from '../lib/CGF.js';

/**
 * MyMovingObject
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene, obj) {
		super(scene);
		this.obj = obj;
		this.ang = 0;
		this.pos = [0, 0, 0];
		this.vel = 0;
	}

	update() {
    this.pos[0] += this.vel*this.scene.speedFactor*Math.sin(this.ang);
		this.pos[2] += this.vel*this.scene.speedFactor*Math.cos(this.ang);
  }
	applyMovement() {
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
    this.scene.rotate(this.ang, 0, 1, 0);
	}
	display() {
		this.obj.display()
	}
}
