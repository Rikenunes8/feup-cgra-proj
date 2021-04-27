import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyHalfSphere } from "./geometries/MyHalfSphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    constructor(scene, radius) {
        super(scene);
        this.initMaterials();
        var mul = 2; // Not to use less than 1
        this.nest = new MyHalfSphere(this.scene, 16 * mul, 8 * mul);
        this.radius = radius;
    }

    initMaterials() {
        this.shell = new CGFappearance(this.scene);
        this.shell.setAmbient(0, 0, 0, 0);
        this.shell.setDiffuse(0, 0, 0, 0);
        this.shell.setSpecular(0, 0, 0, 0);
        this.shell.setEmission(1, 1, 1, 1);
        this.shell.loadTexture('./images/shell.jpg')
        this.shell.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.shell.apply();

        this.scene.translate(0, -20 , 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.scale(this.radius, this.radius/2, this.radius); 
        this.nest.display();
    }

}