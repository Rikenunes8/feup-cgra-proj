import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyHalfSphere } from "./geometries/MyHalfSphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    constructor(scene, radius, x, z) {
        super(scene);
        this.initMaterials();
        var mul = 2; // Not to use less than 1
        this.nest = new MyHalfSphere(this.scene, 16 * mul, 8 * mul);
        this.radius = radius;
        this.x = x;
        this.y = this.scene.floor+0.85;
        this.z = z;
    }

    initMaterials() {
        this.shell = new CGFappearance(this.scene);
        this.shell.setAmbient(1, 1, 1, 1);
        this.shell.setDiffuse(1, 1, 1, 1);
        this.shell.loadTexture('./images/shell.jpg')
        this.shell.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.shell.apply();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.radius, this.radius/4, this.radius);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.nest.display();
    }

}