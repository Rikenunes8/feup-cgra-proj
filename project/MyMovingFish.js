import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from "./MyFish.js";

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
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
 

  limitYVel() {
    if (this.pos[1] >= this.LIMIT_SUP && this.yVel > 0) {
      this.yVel = 0;
    }
    else if (this.pos[1] <= this.LIMIT_INF && this.yVel < 0) {
      this.yVel = 0;
    }
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
  

  pickRock(rock) {
    if (this.rock == null && rock != null) {
      this.rock = rock;
      this.rock.state = 1;
    }
  }
  dropRock() {
    this.rock.state = 2;
    this.rock.x = this.pos[0] +0.3*Math.sin(this.ang);
    this.rock.y = this.pos[1] -0.05;
    this.rock.z = this.pos[2] +0.3*Math.cos(this.ang);
    this.rock.velX = this.vel/**this.scene.speedFactor*/*Math.sin(this.ang);
    this.rock.velZ = this.vel/**this.scene.speedFactor*/*Math.cos(this.ang);
    this.scene.rocksFalling.push(this.rock);
    this.rock = null;
  }

  isFree() {
    return this.rock == null;
  }

  isInLimInf(){
    return this.pos[1] <= this.LIMIT_INF;
  }

  getPosition() {
    return this.pos;
  }

  reset() {
    this.pos = [0, this.LIMIT_SUP, 0];
    this.ang = 0;
    this.vel = 0;
    if (this.rock != null) {
      this.rock.reset();
      this.rock = null;
    }
  }

  
}
