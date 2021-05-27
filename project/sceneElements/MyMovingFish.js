import { MyMovingObject } from './MyMovingObject.js';
import { MyFish } from "./MyFish.js";

/**
 * MyMovingFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingFish extends MyMovingObject {
	constructor(scene) {
		super(scene, new MyFish(scene, true));
    // Consts
    this.LIMIT_SUP = this.scene.floor + 3.0;
    this.LIMIT_INF = this.scene.floor + 1.5;
    this.VEL_MAX = 0.5;
    this.Y_VEL_MAX = 0.05;
    

    this.rock = null;
    this.rockHeightOffset = -0.05;
    this.rockFrontOffset = 0.3;
    
    this.tailOri = 1.0;
    this.leftOri = 1.0;
    this.rightOri = 1.0;

    this.tailVel = 0.03;
    this.finVel  = 0.05;

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

    this.obj.angTail = this.obj.angTail + this.tailOri*(this.tailVel+Math.abs(this.vel)*0.8)*this.scene.speedFactor;
    if (!this.turningLeft)  this.obj.angLFin = this.obj.angLFin + this.leftOri*(this.finVel)*this.scene.speedFactor;
    if (!this.turningRight) this.obj.angRFin = this.obj.angRFin + this.rightOri*(this.finVel)*this.scene.speedFactor;

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
    if (this.obj.angTail > Math.PI / 8 ) {
      this.tailOri = -1;
    } else if (this.obj.angTail < -Math.PI / 8) {
      this.tailOri = 1;
    }

    if (this.obj.angLFin > Math.PI / 8) {
      this.leftOri = -1;
    } else if (this.obj.angLFin < -Math.PI / 16) {
      this.leftOri = 1;
    }

    if (this.obj.angRFin > Math.PI / 8) {
      this.rightOri = -1;
    } else if (this.obj.angRFin < -Math.PI / 16) {
      this.rightOri = 1;
    }
  }

  display() {
    super.applyMovement();
    super.display();
    if (this.rock != null) {
      this.scene.rockAppearence.apply();
      this.scene.translate(0, this.rockHeightOffset, this.rockFrontOffset);
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
    this.rock.x = this.pos[0] + this.rockFrontOffset*Math.sin(this.ang);
    this.rock.y = this.pos[1] + this.rockHeightOffset;
    this.rock.z = this.pos[2] + this.rockFrontOffset*Math.cos(this.ang);
    this.rock.velX = (this.vel+0.01)*Math.sin(this.ang);
    this.rock.velZ = (this.vel+0.01)*Math.cos(this.ang);
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
