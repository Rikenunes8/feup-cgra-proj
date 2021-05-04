import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MySeaWeed } from "./MySeaWeed.js";

export class MySeaWeedSet extends CGFobject {
  constructor(scene, n) {
    super(scene);
    this.max = 23;
    this.min = -23;
    this.n = n;
    this.initSeaWeed();
  }

  initSeaWeed() {
    this.plants = [];
    this.plantsX = [];
    this.plantsZ = [];
    for (let i = 0; i < this.n; i++) {
      this.plants.push(new MySeaWeed(this.scene));
      this.plantsX.push(this.generateRandom());
      this.plantsZ.push(this.generateRandom());

    }
  }

  generateRandom() {
    return (Math.floor(Math.random() * (this.max - this.min)) + this.min);
  }

  display() {
    for (let i = 0; i < this.n; i++) {
      this.scene.pushMatrix();
      this.scene.translate(this.plantsX[i], -24.1, this.plantsZ[i]);
      this.scene.scale(0.3, 0.3, 0.3);
      if(this.plants[i].type%2==0)
      this.plants[i].display4();
      else
      this.plants[i].display3();
      this.scene.popMatrix();
    }
  }
}
