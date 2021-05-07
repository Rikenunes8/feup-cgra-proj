import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MySphere } from "./geometries/MySphere.js";
import { MyTriangle } from "./geometries/MyTriangle.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFish extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
    
    this.angTail = 0;
    this.angLFin = 0;
    this.angRFin = 0;
	}

	init() {
    var mul = 2; // Not to use less than 1
    this.body     = new MySphere(this.scene, 16*mul, 8*mul);
    this.leftFin  = new MyTriangle(this.scene);
    this.rightFin = new MyTriangle(this.scene);
    this.upperFin = new MyTriangle(this.scene);
    this.tailFin  = new MyTriangle(this.scene);
    this.rightEye = new MySphere(this.scene, 8*mul, 4*mul);
    this.leftEye  = new MySphere(this.scene, 8*mul, 4*mul);

    this.initMaterials();
	}
  initMaterials() {
    this.fishScales = new CGFappearance(this.scene);
    /*this.fishScales.setAmbient(0.1, 0.1, 0.1, 1);
    this.fishScales.setDiffuse(0.9, 0.9, 0.9, 1);
    this.fishScales.setSpecular(0.1, 0.1, 0.1, 1);
    this.fishScales.setShininess(10.0);*/
    this.fishScales.loadTexture('./images/fish/fish_scales.jpg');
    this.fishShader = new CGFshader(this.scene.gl, './shaders/fish_shader.vert', './shaders/fish_shader.frag');

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient (1.0, 0.0, 0.0, 1.0);
    this.red.setDiffuse (1.0, 0.0, 0.0, 1.0);
    this.red.setSpecular(1.0, 0.0, 0.0, 1.0);
    this.red.setShininess(10.0);
    this.redShader = new CGFshader(this.scene.gl, './shaders/red.vert', './shaders/red.frag');

    this.eye = new CGFappearance(this.scene);
    this.eye.setAmbient (1.0, 1.0, 1.0, 1.0);
    this.eye.setDiffuse (1.0, 1.0, 1.0, 1.0);
    this.eye.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.eye.setShininess(10.0);
    this.eye.loadTexture('./images/fish/eye.png');

  }

  display() {
    this.displayBody();

    this.red.apply();
    this.scene.setActiveShader(this.redShader);
    this.displayUpperFin();
    this.displayLeftFin();
    this.displayRightFin();
    this.displayTailFin();
    this.scene.setActiveShader(this.scene.defaultShader);

    this.eye.apply();
    this.displayLeftEye();
    this.displayRightEye();
  }
  

  displayBody() {
    this.scene.pushMatrix();
    this.fishScales.apply();
    this.scene.setActiveShader(this.fishShader);
    this.scene.scale(0.11, 0.19, 0.25); // Prop: 0.22:0.38:0.5
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.body.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }

  displayUpperFin() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0.17, -0.07);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.scene.translate(0, -0.08, 0);
    this.scene.scale(0.08, 0.08, 0.08);
    this.upperFin.display();
    this.scene.popMatrix();
  }
  
  displayLeftFin() {
    this.scene.pushMatrix();
    this.scene.translate(0.1, -0.07, 0.03);
    this.scene.rotate(-Math.PI/3 - this.angLFin, 0, 0, 1); // Move Fin
    this.scene.rotate( Math.PI/4, 0, 1, 0);
    this.scene.rotate( Math.PI/2, 1, 0, 0);
    this.scene.translate(0.08, 0, 0);
    this.scene.scale(0.08, 0.08, 0.08);
    this.leftFin.display();
    this.scene.popMatrix();
  }

  displayRightFin() {
    this.scene.pushMatrix();
    this.scene.translate(-0.1, -0.07, 0.03);
    this.scene.rotate( Math.PI/3 + this.angRFin, 0, 0, 1); // Move Fin
    this.scene.rotate(-Math.PI/4, 0, 1, 0);
    this.scene.rotate( Math.PI/2, 1, 0, 0);
    this.scene.translate(-0.08, 0, 0);
    this.scene.scale(0.08, 0.08, 0.08);
    this.rightFin.display();
    this.scene.popMatrix();
  }


  displayTailFin() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.25);
    this.scene.rotate(this.angTail, 0, 1, 0); // Move Fin
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -0.16, 0);
    this.scene.scale(0.16, 0.16, 0.16);
    this.tailFin.display();
    this.scene.popMatrix();
  }

  displayLeftEye() {
    this.scene.pushMatrix();
    this.scene.translate(0.08, 0.03, 0.11);
    this.scene.rotate(-Math.PI/8, 0, 1, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.04, 0.04, 0.04);
    this.leftEye.display();
    this.scene.popMatrix();
  }

  displayRightEye() {
    this.scene.pushMatrix();
    this.scene.translate(-0.08, 0.03, 0.11);
    this.scene.rotate(Math.PI/8, 0, 1, 0);
    this.scene.scale(0.04, 0.04, 0.04);
    this.rightEye.display();
    this.scene.popMatrix();
  }
}
