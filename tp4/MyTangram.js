import {CGFscene, CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}
	
	init() {
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangleSmallBlue = new MyTriangleSmall(this.scene, true);
    this.triangleSmallRed = new MyTriangleSmall(this.scene, false);
    this.triangleBigBlue = new MyTriangleBig(this.scene, true);
    this.triangleBigOrange = new MyTriangleBig(this.scene, false);

    this.initMaterials();
    //this.initMaterials2();
	}
  initMaterials() {
    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 0, 0, 1.0);
    this.green.setSpecular(0, 1, 0, 1.0);
    this.green.setShininess(10.0);

    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0, 0, 1, 1.0);
    this.blue.setDiffuse(0, 0, 0, 1.0);
    this.blue.setSpecular(0, 0, 1, 1.0);
    this.blue.setShininess(10.0);

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(1, 153.0/255.0, 0, 1.0);
    this.orange.setDiffuse(0, 0, 0, 1.0);
    this.orange.setSpecular(1, 153.0/255.0, 0, 1.0);
    this.orange.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(1, 1, 0, 1.0);
    this.yellow.setDiffuse(0, 0, 0, 1.0);
    this.yellow.setSpecular(1, 1, 0, 1.0);
    this.yellow.setShininess(10.0);

    this.pink = new CGFappearance(this.scene);
    this.pink.setAmbient(1, 153.0/255.0, 204.0/255.0, 1.0);
    this.pink.setDiffuse(0, 0, 0, 1.0);
    this.pink.setSpecular(1, 153.0/255.0, 204.0/255.0, 1.0);
    this.pink.setShininess(10.0);

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(0, 0, 0, 1.0);
    this.red.setSpecular(1, 0, 0, 1.0);
    this.red.setShininess(10.0);

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(153.0/255.0, 0, 204.0/255.0, 1.0);
    this.purple.setDiffuse(0, 0, 0, 1.0);
    this.purple.setSpecular(153.0/255.0, 0, 204.0/255.0, 1.0);
    this.purple.setShininess(10.0);

    this.tangramImage = new CGFappearance(this.scene);
    this.tangramImage.loadTexture('images/tangram.png')
    this.tangramImage.setTextureWrap('REPEAT', 'REPEAT');
  }
  initMaterials2() {
    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0, 1, 0, 1.0);
    this.green.setDiffuse(0, 0, 0, 1.0);
    this.green.setSpecular(1, 1, 1, 1.0);
    this.green.setShininess(10.0);

    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0, 0, 1, 1.0);
    this.blue.setDiffuse(0, 0, 0, 1.0);
    this.blue.setSpecular(1, 1, 1, 1.0);
    this.blue.setShininess(10.0);

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(1, 153.0/255.0, 0, 1.0);
    this.orange.setDiffuse(0, 0, 0, 1.0);
    this.orange.setSpecular(1, 1, 1, 1.0);
    this.orange.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(1, 1, 0, 1.0);
    this.yellow.setDiffuse(0, 0, 0, 1.0);
    this.yellow.setSpecular(1, 1, 1, 1.0);
    this.yellow.setShininess(10.0);

    this.pink = new CGFappearance(this.scene);
    this.pink.setAmbient(1, 153.0/255.0, 204.0/255.0, 1.0);
    this.pink.setDiffuse(0, 0, 0, 1.0);
    this.pink.setSpecular(1, 1, 1, 1.0);
    this.pink.setShininess(10.0);

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(1, 0, 0, 1.0);
    this.red.setDiffuse(0, 0, 0, 1.0);
    this.red.setSpecular(1, 1, 1, 1.0);
    this.red.setShininess(10.0);

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(153.0/255.0, 0, 204.0/255.0, 1.0);
    this.purple.setDiffuse(0, 0, 0, 1.0);
    this.purple.setSpecular(1, 1, 1, 1.0);
    this.purple.setShininess(10.0);
  }
  display() {
    var a = Math.PI/6;
    var rotateMatrix = [
      Math.cos(a), Math.sin(a), 0, 0,
      -Math.sin(a), Math.cos(a), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    var Tx=-1.5, Ty=2.6, Tz=0;
    var translateMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      Tx, Ty, Tz, 1
    ]

    this.tangramImage.apply();
    
    this.scene.pushMatrix();
    this.scene.multMatrix(translateMatrix);
    this.scene.multMatrix(rotateMatrix);
    this.diamond.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 0, 0);
    this.triangleBigBlue.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.triangleBigOrange.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2)+0.5, Math.sqrt(2), 0);
    this.scene.rotate(-Math.PI*3/4, 0, 0, 1);
    this.scene.translate(1, 1, 0);
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(3.5, 0, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.triangleSmallBlue.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5, 3.5, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);
    this.triangleSmallRed.display();
    this.scene.popMatrix();
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
