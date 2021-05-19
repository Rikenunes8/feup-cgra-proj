import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from "./MyFish.js";

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAnimatedFish extends MyMovingObject {
	constructor(scene) {
		super(scene, new MyFish(scene));
    // Consts
    this.LIMIT_SUP = this.scene.floor + 3.0;
    this.LIMIT_INF = this.scene.floor + 1.5;
    this.VEL_MAX = 1.0;
    this.Y_VEL_MAX = 0.05;
    

    this.rock = null;
    
    this.tailOri = 1.0;
    this.leftOri = 1.0;
    this.rightOri = 1.0;

    this.turningRight = false;
    this.turningLeft = false;
    
    this.pos[1] = this.LIMIT_SUP;
    this.yVel = 0;
	}


  update() {
    super.update();
    this.limitYVel();
    this.pos[1] += this.yVel*this.scene.speedFactor;

    this.setFinsMovOrientation();

    if (this.vel > this.VEL_MAX) {
      this.vel = this.VEL_MAX;
    }

    this.obj.angTail = this.obj.angTail + this.tailOri*(3+Math.abs(this.vel)*20.0)*Math.PI/180;
    if (!this.turningLeft)  this.obj.angLFin = this.obj.angLFin + this.leftOri*(2)*Math.PI/180;
    if (!this.turningRight) this.obj.angRFin = this.obj.angRFin + this.rightOri*(2)*Math.PI/180;

    this.turningLeft = false;
    this.turningRight = false;
  }
 


  setFinsMovOrientation() {
    if (this.obj.angTail > Math.PI / 8 || this.obj.angTail < -Math.PI / 8) {
      this.tailOri = -this.tailOri;
    }
    if (this.obj.angLFin > Math.PI / 8 || this.obj.angLFin < 0) {
      this.leftOri = -this.leftOri;
    }
    if (this.obj.angRFin > Math.PI / 8 || this.obj.angRFin < 0) {
      this.rightOri = -this.rightOri;
    }
  }

  display() {
    super.applyMovement();
    super.display();
    if (this.rock != null) {
      this.scene.rockAppearence.apply();
      this.scene.translate(0, -0.05, 0.3);
      this.rock.display();
    }
  }
  


  getPosition() {
    return this.pos;
  }

  reset() {
    this.pos = [0, this.LIMIT_SUP, 0];
    this.ang = 0;
    this.vel = 0;
  }

  
}
