import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MySeaWeed } from "./MySeaWeed.js";

export class MySeaWeedSet extends CGFobject {
  constructor(scene, n, xMax, xMin, zMax, zMin) {
    super(scene);
    this.n = n;
    this.initSeaWeed(xMax, xMin, zMax, zMin);
  }

  initSeaWeed(xMax, xMin, zMax, zMin) {
    this.plants = [];
    this.plantsX = [];
    this.plantsZ = [];

    var offset = 0.05; // Offset to not overlap rocks
    for (let i = 0; i < this.n; i++) {
      this.plants.push(new MySeaWeed(this.scene, this.scene.generateRandom(6, 3, 1)));
      this.plantsX.push(this.scene.generateRandom(xMax, xMin, 10)+offset);
      this.plantsZ.push(this.scene.generateRandom(zMax, zMin, 10)+offset);
    }
  }

  

  display() {
    for (let i = 0; i < this.n; i++) {
      this.scene.pushMatrix();
      this.scene.translate(this.plantsX[i], this.scene.floor + 0.6, this.plantsZ[i]);
      this.plants[i].display();
      this.scene.popMatrix();
    }
  }
}
