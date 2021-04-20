import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MySphere } from "../MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
//import { MyTriangleSmall } from "./MyTriangleSmall.js";
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
    this.body = new MySphere(this.scene, 16, 8);
    this.leftFin = new MyTriangle(this.scene);
    this.rightFin = new MyTriangle(this.scene);
    this.upperFin = new MyTriangle(this.scene);
    //this.triangleSmallBlue = new MyTriangleSmall(this.scene, true);
    //this.triangleSmallRed = new MyTriangleSmall(this.scene, false);
    this.tail = new MyTriangleBig(this.scene, true);

    this.initMaterials();
	}
  initMaterials() {
    this.fishScales = new CGFappearance(this.scene);
    this.fishScales.setAmbient(0.1, 0.1, 0.1, 1);
    this.fishScales.setDiffuse(0.9, 0.9, 0.9, 1);
    this.fishScales.setSpecular(0.1, 0.1, 0.1, 1);
    this.fishScales.setShininess(10.0);
    this.fishScales.loadTexture('./MyFish/fish_scales.jpg');
    this.fishScales.setTextureWrap('REPEAT', 'REPEAT');

    this.fishShader = new CGFshader(this.scene.gl, './MyFish/fish_shader.vert', './MyFish/fish_shader.frag');

  }

  display() {
    this.fishScales.apply();
    this.scene.setActiveShader(this.fishShader);

    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
    this.scene.rotate(this.ang, 0, 1, 0);

    this.scene.scale(0.8, 1.2, 2);
    this.fishScales.apply();
    this.body.display();

    this.scene.setActiveShader(this.scene.defaultShader);
  }
  
}
