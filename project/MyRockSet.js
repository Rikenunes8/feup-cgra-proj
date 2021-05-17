import { CGFobject} from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";
import { MyRockConcrete } from './MyRockConcrete.js';

export class MyRocketSet extends CGFobject {
  constructor(scene, n, xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin){
    super(scene);
    
    this.n = n;
    this.initRocks(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin);
  }

  initRocks(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin) {
    this.rocks = [];
    for (let i = 0; i < this.n; i++) {
      var rock  = new MyRock(this.scene, 8, 4, 15);
      var initX = this.generateRandom(xMax, xMin, 10);
      var initZ = this.generateRandom(zMax, zMin, 10);
      var sclX  = this.generateRandom(sclXMax, sclXMin, 10);
      var sclZ  = this.generateRandom(sclZMax, sclZMin, 10);
      var rotY  = this.generateRandom(rotMax, rotMin, 1);
      this.rocks.push(new MyRockConcrete(this.scene, rock, initX, initZ, sclX, sclZ, rotY));
    }
  }

  generateRandom(max, min, prec) { // Max and min both included
    return (Math.floor(Math.random() * (max - min + 1) ) + min)/prec;
  }

  display() {
    this.scene.rockAppearence.apply();
    for (let i = 0; i < this.n; i++) {
      if (this.rocks[i].state == 1) continue;
      this.scene.pushMatrix();
      this.rocks[i].display();
      this.scene.popMatrix();
    }
  }

  getClosestRock(x, z) {
    var distance = 99999;
    var rock = null;
    for (let i = 0; i < this.n; i++) {
      var r = this.rocks[i];
      if (r.state != 0) continue;

      var d = Math.sqrt(Math.pow(x-r.x, 2) + Math.pow(z-r.z, 2));
      if (d < distance) {
        distance = d;
        rock = r;
      }
    }

    return distance < 1.5? rock : null;
  }
}
