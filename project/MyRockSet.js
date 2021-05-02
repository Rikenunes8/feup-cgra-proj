import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRocketSet extends CGFobject {
  constructor(scene, n, xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin){
    super(scene);
    this.rockAppearence = new CGFappearance(this.scene);
    this.rockAppearence.setEmission(0.1,0.1,0.1,1);
    this.n = n;
    this.initRocks(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin);
  }

  initRocks(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin, rotMax, rotMin) {
    this.rocks = [];
    this.rocksX = [];
    this.rocksZ = [];
    this.rocksSclX = [];
    this.rocksSclZ = [];
    this.rocksRotY = [];
    for (let i = 0; i < this.n; i++) {
      this.rocks.push(new MyRock(this.scene, 8, 4, 15));
      this.rocksX.push(this.generateRandom(xMax, xMin, 10));
      this.rocksZ.push(this.generateRandom(zMax, zMin, 10));
      this.rocksSclX.push(this.generateRandom(sclXMax, sclXMin, 10));
      this.rocksSclZ.push(this.generateRandom(sclZMax, sclZMin, 10));
      this.rocksRotY.push(this.generateRandom(rotMax, rotMin, 1));
    }
  }

  generateRandom(max, min, prec) {
    return (Math.floor(Math.random() * (max - min) ) + min)/prec;
  }

  display() {
    this.rockAppearence.apply();
    for (let i = 0; i < this.n; i++) {
      this.scene.pushMatrix();
      this.scene.translate(this.rocksX[i], -23.1, this.rocksZ[i]);
      this.scene.rotate(this.rocksRotY[i]*Math.PI/180, 0, 1, 0);
      this.scene.scale(this.rocksSclX[i], 1, this.rocksSclZ[i]);
      this.scene.scale(0.1, 0.05, 0.1);
      this.rocks[i].display();
      this.scene.popMatrix();
    }
  }
}
