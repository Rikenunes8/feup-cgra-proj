import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MySphere } from "../MySphere.js";
import { MyTriangle } from "./MyTriangle.js";

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
    var mul = 2;
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
    this.fishScales.setShininess(10.0);
    this.fishScales.setTextureWrap('REPEAT', 'REPEAT');*/
    this.fishScales.loadTexture('./MyFish/fish_scales.jpg');
    this.fishShader = new CGFshader(this.scene.gl, './MyFish/fish_shader.vert', './MyFish/fish_shader.frag');

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient (1.0, 0.0, 0.0, 1.0);
    this.red.setDiffuse (1.0, 0.0, 0.0, 1.0);
    this.red.setSpecular(1.0, 0.0, 0.0, 1.0);
    this.red.setShininess(10.0);
    this.redShader = new CGFshader(this.scene.gl, './MyFish/red.vert', './MyFish/red.frag');

    this.eye = new CGFappearance(this.scene);
    this.eye.setAmbient (1.0, 1.0, 1.0, 1.0);
    this.eye.setDiffuse (1.0, 1.0, 1.0, 1.0);
    this.eye.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.eye.setShininess(10.0);
    this.eye.loadTexture('./MyFish/eye.png');


  }

  display() {
    var sca = 4.0/8;
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
    this.scene.scale(sca, sca, sca);
    this.scene.rotate(this.ang, 0, 1, 0);

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
    this.scene.scale(0.8, 1.2, 2);
    this.fishScales.apply();
    this.body.display();
    this.scene.setActiveShader(this.scene.defaultShader);
    this.scene.popMatrix();
  }

  displayUpperFin() {
    this.scene.pushMatrix();
    this.scene.translate(0, 1.1, -0.3);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.scene.translate(0, -0.5, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.upperFin.display();
    this.scene.popMatrix();
  }

  displayLeftFin() {
    this.scene.pushMatrix();
    this.scene.translate(-0.8, 0, 0.3);
    this.scene.rotate(Math.PI / 4, 0, 0, 1); // TODO: apply movement
    this.scene.rotate(-Math.PI / 4, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.translate(-0.5, 0, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.rightFin.display();
    this.scene.popMatrix();
  }

  displayRightFin() {
    this.scene.pushMatrix();
    this.scene.translate(0.8, 0, 0.3);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1); // TODO: apply movement
    this.scene.rotate(Math.PI / 4, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.translate(0.5, 0, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.rightFin.display();
    this.scene.popMatrix();
  }

  displayTailFin() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -2);
    this.scene.rotate(0, 0, 1, 0); // TODO: apply movement
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, -1, 0);
    this.tailFin.display();
    this.scene.popMatrix();
  }

  displayLeftEye() {
    this.scene.pushMatrix();
    this.scene.translate(0.45, 0.0, 1.5);
    this.scene.rotate(-Math.PI/6, 0, 1, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.2, 0.2, 0.2);
    this.leftEye.display();
    this.scene.popMatrix();
  }

  displayRightEye() {
    this.scene.pushMatrix();
    this.scene.translate(-0.45, 0.0, 1.5);
    this.scene.rotate(Math.PI/6, 0, 1, 0);
    this.scene.scale(0.2, 0.2, 0.2);
    this.rightEye.display();
    this.scene.popMatrix();
  }
}
