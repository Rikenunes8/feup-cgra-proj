import {CGFscene, CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
    this.ang = 0;
    this.pos = [0, 0, 0];
    this.vel = 0;
	}
  update() {
    this.pos[0] += this.vel*this.scene.speedFactor*Math.sin(this.ang);
		this.pos[2] += this.vel*this.scene.speedFactor*Math.cos(this.ang);
  }
	init() {
    this.body = new MySphere(this.scene);
    this.leftFin = new MyTriangle(this.scene);
    this.rightFin = new MyTriangle(this.scene);
    this.upperFin = new MyTriangle(this.scene);
    //this.triangleSmallBlue = new MyTriangleSmall(this.scene, true);
    //this.triangleSmallRed = new MyTriangleSmall(this.scene, false);
    this.tail = new MyTriangleBig(this.scene, true);

    //this.initMaterials();
	}
  /*initMaterials() {
    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(0, 0, 0, 1.0);
    this.red.setSpecular(1, 0, 0, 1.0);
    this.red.setShininess(10.0);

    this.tangramImage = new CGFappearance(this.scene);
    this.tangramImage.setAmbient(0.1, 0.1, 0.1, 1);
    this.tangramImage.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tangramImage.setSpecular(0.1, 0.1, 0.1, 1);
    this.tangramImage.setShininess(10.0);
    this.tangramImage.loadTexture('images/tangram.png')
    this.tangramImage.setTextureWrap('REPEAT', 'REPEAT');
  }*/

  display() {
    
  }
  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.parallelogram.enableNormalViz();
    this.triangle.enableNormalViz();
    this.triangleSmall.enableNormalViz();
    this.triangleBig.enableNormalViz();
  }
  disableNormalViz() {
    this.diamond.disableNormalViz();
    this.parallelogram.disableNormalViz();
    this.triangle.disableNormalViz();
    this.triangleSmall.disableNormalViz();
    this.triangleBig.disableNormalViz();
  }
}
