import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from "./geometries/MyCylinder.js";

/**
 * MyPilar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPilar extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.initMaterials();
        this.pilar = new MyCylinder(this.scene, 16, 30);
        this.x = x;
        this.z = z;
    }

    initMaterials() {
        this.trunk = new CGFappearance(this.scene);
        //this.trunk.setAmbient(1, 1, 1, 1);
        this.trunk.setDiffuse(1, 1, 1, 1);
        this.trunk.setSpecular(0, 0, 0, 1);
        this.trunk.setEmission(0.8, 0.8, 0.8, 0.1);
        this.trunk.loadTexture('./images/trunk_.jpg')
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.trunk.apply();
        this.scene.translate(this.x, -25, this.z);
        this.scene.scale(1, 50, 1);
        this.pilar.display();
    }

}