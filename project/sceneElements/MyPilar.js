import { CGFobject } from '../../lib/CGF.js';
import { MyCylinder } from "../geometries/MyCylinder.js";

/**
 * MyPilar
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPilar extends CGFobject {
    constructor(scene, x, z) {
        super(scene);

        this.height = this.scene.roof-this.scene.floor;
        this.x = x;
        this.y = this.scene.floor;
        this.z = z;
        this.pilar = new MyCylinder(this.scene, 16, this.height/2);
    }

    
    display() {
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1, this.height, 1);
        this.pilar.display();
    }

}