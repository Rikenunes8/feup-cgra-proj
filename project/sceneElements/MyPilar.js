import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from "../geometries/MyCylinder.js";

/**
 * MyPilar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPilar extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.initMaterials();
        this.height = this.scene.roof-this.scene.floor;
        this.x = x;
        this.y = this.scene.floor;
        this.z = z;
        this.pilar = new MyCylinder(this.scene, 16, this.height/2);
    }

    initMaterials() {
        this.trunk = new CGFappearance(this.scene);
        this.trunk.setAmbient(1, 1, 1, 1);
        this.trunk.setDiffuse(1, 1, 1, 1);
        this.trunk.loadTexture('./images/trunk_.jpg')
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {
        this.trunk.apply();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1, this.height, 1);
        this.pilar.display();
    }

}