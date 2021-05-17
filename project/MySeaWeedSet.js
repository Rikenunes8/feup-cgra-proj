import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySeaWeed } from "./MySeaWeed.js";

export class MySeaWeedSet extends CGFobject {
  constructor(scene, n, xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin) {
    super(scene);
    this.n = n;
    this.initSeaWeed(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin);
  }

  initSeaWeed(xMax, xMin, zMax, zMin, sclXMax, sclXMin, sclZMax, sclZMin) {
    this.plants = [];
    this.plantsX = [];
    this.plantsZ = [];
    this.xScale=[];
    this.zScale=[];

    var offset = 0.05; // Offset to not overlap rocks
    for (let i = 0; i < this.n; i++) {
      this.plants.push(new MySeaWeed(this.scene, this.generateRandom(6, 1, 1)));
      this.plantsX.push(this.generateRandom(xMax, xMin, 10)+offset);
      this.plantsZ.push(this.generateRandom(zMax, zMin, 10)+offset);
      this.xScale.push(this.generateRandom(sclXMax, sclXMin, 100));
      this.zScale.push(this.generateRandom(sclZMax, sclZMin, 100));
    }
  }

  generateRandom(max, min, prec) { // Max and min both included
    return (Math.floor(Math.random() * (max - min + 1) ) + min)/prec;
  }

  display() {
    for (let i = 0; i < this.n; i++) {
      this.scene.pushMatrix();
      this.scene.translate(this.plantsX[i], this.scene.floor + 0.3, this.plantsZ[i]);
      this.scene.scale(0.3+this.xScale[i], 0.3, 0.3+this.zScale[i]);
      this.plants[i].display();
      this.scene.popMatrix();
    }
  }
}
