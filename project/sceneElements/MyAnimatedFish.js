import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from "./MyFish.js";

/**
 * MyAnimatedFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnimatedFish extends MyMovingObject {
	constructor(scene, radius, xMax, xMin, zMax, zMin, yMax, yMin, tMax, tMin) {
		super(scene, new MyFish(scene, false));

    this.radius = radius;
    this.centerX = this.scene.generateRandom(xMax, xMin, 1);
    this.centerZ = this.scene.generateRandom(zMax, zMin, 1);
    this.centerY = this.scene.generateRandom(yMax, yMin, 1);
    this.pos[1] = this.centerY;
    this.pos[0] = this.centerX - this.radius;
    this.pos[2] = this.centerZ;

    this.T = this.scene.generateRandom(tMax, tMin, 1);

    var w = 2*Math.PI/this.T * 1.7; // 1.7 to compensate errors
    this.vel = this.radius*0.05*w;  
    this.angInc = 0.05*w;

    this.tailOri = 1.0;
    this.leftOri = 1.0;
    this.rightOri = 1.0;

    this.tailVel = 0.03;
    this.finVel  = 0.02;

    var bool = this.scene.generateRandom(1, 0, 1);
    if (!bool)
      this.ang = Math.PI;
    this.ori = (bool == 1)? 1 : -1;
    this.turningRight = !bool;
    this.turningLeft = bool;
	}


  update() {
    super.update();
    this.setFinsMovOrientation();

    this.ang += this.ori * this.angInc; 
    
    this.obj.angTail = this.obj.angTail + this.tailOri*(this.tailVel+Math.abs(this.vel)*0.8)*this.scene.speedFactor;
    if (!this.turningLeft)  this.obj.angLFin = this.obj.angLFin + this.leftOri*(this.finVel)*this.scene.speedFactor;
    if (!this.turningRight) this.obj.angRFin = this.obj.angRFin + this.rightOri*(this.finVel)*this.scene.speedFactor;
  }
 

  setFinsMovOrientation() {
    if (this.obj.angTail > Math.PI / 8 ) {
      this.tailOri = -1;
    } else if (this.obj.angTail < -Math.PI / 8) {
      this.tailOri = 1;
    }

    if (this.obj.angLFin > Math.PI / 8) {
      this.leftOri = -1;
    } else if (this.obj.angLFin < 0) {
      this.leftOri = 1;
    }

    if (this.obj.angRFin > Math.PI / 8) {
      this.rightOri = -1;
    } else if (this.obj.angRFin < 0) {
      this.rightOri = 1;
    }
  }


  display() {
    super.applyMovement();
    super.display();
  }

}
