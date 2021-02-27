import {CGFobject} from '../lib/CGF.js';
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
		this.init(scene);
	}
	
	init(scene) {
    scene.diamond = new MyDiamond(scene);
    scene.triangle = new MyTriangle(scene);
    scene.parallelogram = new MyParallelogram(scene);
    scene.triangleSmall = new MyTriangleSmall(scene);
    scene.triangleBig = new MyTriangleBig(scene);
	}
  display(scene) {
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

    scene.pushMatrix();
    scene.multMatrix(translateMatrix);
    scene.multMatrix(rotateMatrix);
    scene.diamond.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(-2, 0, 0);
    scene.triangleBig.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(-1, 0, 0);
    scene.rotate(Math.PI, 0, 0, 1);
    scene.triangleBig.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(0.5, 0, 0);
    scene.rotate(Math.PI/2, 0, 0, 1);
    scene.rotate(Math.PI, 1, 0, 0);
    scene.parallelogram.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(Math.sqrt(2)+0.5, Math.sqrt(2), 0);
    scene.rotate(-Math.PI*3/4, 0, 0, 1);
    scene.translate(1, 1, 0);
    scene.triangle.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(3.5, 0, 0);
    scene.rotate(Math.PI, 0, 0, 1);
    scene.triangleSmall.display();
    scene.popMatrix();

    scene.pushMatrix();
    scene.translate(1.5, 3.5, 0);
    scene.rotate(-Math.PI/2, 0, 0, 1);
    scene.triangleSmall.display();
    scene.popMatrix();
  }
}
