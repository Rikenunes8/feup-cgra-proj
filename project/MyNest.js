import { CGFobject, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyHalfSphere } from "./MyHalfSphere.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();

        this.angTail = 0;
        this.angLFin = 0;
        this.angRFin = 0;
    }

    init() {
        var mul = 2; // Not to use less than 1
        this.nest = new MyHalfSphere(this.scene, 16 * mul, 8 * mul);
        this.initMaterials();

    }

    initMaterials() {
        this.shell = new CGFappearance(this.scene);
        this.shell.setAmbient(0, 0, 0, 0);
        this.shell.setDiffuse(0, 0, 0, 0);
        this.shell.setSpecular(0, 0, 0, 0);
        this.shell.setEmission(1, 1, 1, 1);
        this.shell.loadTexture('images/shell.jpg')
        this.shell.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.shell.apply();
        this.scene.rotate(Math.PI, 0, 0, 1);

        this.scene.translate(0, 23 , 0);

        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.scale(2.5, 1, 2.5); // Prop: 0.22:0.38:0.5

        this.nest.display();
    }

}