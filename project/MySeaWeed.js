import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./geometries/MyPyramid.js";

export class MySeaWeed extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sw1 = new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4));
        this.sw2 = new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4));
        this.sw3 = new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4));
        this.sw4 = new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4));

        this.greens = [
            [34, 139, 34],   //0
            [0, 128, 0],     //1
            [0, 100, 0],     //2
            [154, 205, 50],  //3
            [143, 188, 143], //4
            [46, 139, 87],   //5
            [128, 128, 0],   //6
            [85, 107, 47],   //7
            [107, 142, 35]   //8
        ];
        this.type = Math.floor(Math.random() * 10);
        this.initMaterials();
    }
    initMaterials() {
        var color = Math.floor(Math.random() * 8);
        var color2 = Math.floor(Math.random() * 8);


        this.green = new CGFappearance(this.scene);
        this.green.setEmission(this.greens[color][0] / 256, this.greens[color][1] / 256, this.greens[color][2] / 256, 0.5);

        this.green2 = new CGFappearance(this.scene);
        this.green2.setEmission(this.greens[color2][0] / 256, this.greens[color2][1] / 256, this.greens[color2][2] / 256, 0.5);

    }

    display4() {
        this.green.apply();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.sw1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);
        this.sw2.display();
        this.scene.popMatrix();

        this.green2.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.sw3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1);
        this.sw4.display();
        this.scene.popMatrix();
    }
    display3() {
        this.green.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.75, 0, 0.75);
        this.sw1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.75, 0, 0.75);
        this.sw2.display();
        this.scene.popMatrix();
        
        
        this.green2.apply();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, -0.5);
        this.sw3.display();
        this.scene.popMatrix();
    }

}