import { CGFobject } from '../../lib/CGF.js';
import { MyPlane } from "../MyPlane.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.seaFloor = new MyPlane(this.scene, 50);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(50, 1, 50);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.seaFloor.display();
        this.scene.popMatrix();
    }
}