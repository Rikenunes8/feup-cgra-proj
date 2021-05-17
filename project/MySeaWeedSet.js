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

    for (let i = 0; i < this.n; i++) {
      this.plants.push(new MySeaWeed(this.scene));
      this.plantsX.push(this.generateRandom(xMax, xMin, 10));
      this.plantsZ.push(this.generateRandom(zMax, zMin, 10));
      this.xScale.push(this.generateRandom(sclXMax, sclXMin, 100));
      this.zScale.push(this.generateRandom(sclZMax, sclZMin, 100));
    }
  }

  generateRandom(max, min, prec) {
    return (Math.floor(Math.random() * (max - min) ) + min)/prec;
  }

  display() {
    for (let i = 0; i < this.n; i++) {
      this.scene.pushMatrix();
      this.scene.translate(this.plantsX[i], this.scene.floor + 0.3, this.plantsZ[i]);
      this.scene.scale(0.3+this.xScale[i], 0.3, 0.3+this.zScale[i]);
      if(this.plants[i].type==0)
        this.plants[i].display6();
      else if(this.plants[i].type==1)
        this.plants[i].display5();
      else if(this.plants[i].type==2)
        this.plants[i].display4();
      else if(this.plants[i].type==3)
        this.plants[i].display3();
      this.scene.popMatrix();
    }
  }
}
