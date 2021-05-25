import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyPilarSet extends CGFobject {
  constructor(scene, posX, posZ) {
    super(scene);
    this.initMaterials();

    this.pilars = [];
    for (let i = 0; i < posX.lenght; i++) {
      this.pilars.push(new MyPilar(this, posX[i], posZ[i]));
    }
  }

  initMaterials() {
    this.trunk = new CGFappearance(this.scene);
    this.trunk.setAmbient(1, 1, 1, 1);
    this.trunk.setDiffuse(1, 1, 1, 1);
    this.trunk.loadTexture('./images/trunk_.jpg')
    this.trunk.setTextureWrap('REPEAT', 'REPEAT');
  }
  display() {
    this.trunk.apply();
    for (let i = 0; i < this.pilars.length; i++) {
      this.scene.pushMatrix();
      this.pilars[i].display();
      this.scene.popMatrix();
    }
  }
}