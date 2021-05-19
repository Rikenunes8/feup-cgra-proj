import { CGFappearance, CGFobject } from '../../lib/CGF.js';
import { MyPyramid } from "../geometries/MyPyramid.js";

export class MySeaWeed extends CGFobject {
    constructor(scene, n) {
        super(scene);

        this.greenColors = [
            [ 34, 139,  34],  //0
            [  0, 128,   0],  //1
            [  0, 100,   0],  //2
            [154, 205,  50],  //3
            [143, 188, 143],  //4
            [ 46, 139,  87],  //5
            [128, 128,   0],  //6
            [ 85, 107,  47],  //7
            [107, 142,  35]   //8
        ];

        this.initMaterials();

        if (n > 6) n = 6;
        this.n = n;

        this.sw = [];
        this.swColor = [];
        this.swScl = [];
        this.swRot = [];
        for (let i = 0; i < n; i++) {
            this.sw.push(new MyPyramid(this.scene, 6, 1, this.scene.generateRandom(12, 6, 1)));
            this.swColor.push(this.greens[this.scene.generateRandom(this.greens.length-1, 0, 1)]);
            this.swScl.push(this.scene.generateRandom(7, 3, 10));
            this.swRot.push(this.scene.generateRandom(90, 0, 1));
        }

        this.sclPos = 2;
        this.positions = [
            [ 0, 0,  0],
            [-1, 0, -1],
            [ 1, 0, -1],
            [-1, 0,  0],
            [ 0, 0,  1],
            [ 1, 0,  0]
        ]

       
    }
    initMaterials() {
        var colors = [];
        this.greens = [];

        for (let i = 0; i < 3; i++) {
            colors.push(this.scene.generateRandom(8, 0, 1));
            var green = new CGFappearance(this.scene);
            green.setAmbient(this.greenColors[colors[i]][0] / 256, this.greenColors[colors[i]][1] / 256, this.greenColors[colors[i]][2] / 256, 0.5);
            green.setDiffuse(this.greenColors[colors[i]][0] / 256, this.greenColors[colors[i]][1] / 256, this.greenColors[colors[i]][2] / 256, 0.5);
            this.greens.push(green);
        }
    }

    display() {
        for (let i = 0; i < this.n; i++) {
            this.swColor[i].apply();
            this.scene.pushMatrix();
            this.scene.scale(0.1, 0.15, 0.1);
            this.scene.translate(this.sclPos*this.positions[i][0], this.sclPos*this.positions[i][1], this.sclPos*this.positions[i][2]);
            this.scene.rotate(this.swRot[i]*Math.PI/180, 0, 1, 0);
            this.scene.scale(this.swScl[i], 1, 1);
            this.sw[i].display();
            this.scene.popMatrix();
        }
    }
}

