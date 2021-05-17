import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./geometries/MyPyramid.js";

export class MySeaWeed extends CGFobject {
    constructor(scene, n) {
        super(scene);

        this.greens = [
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
        for (let i = 0; i < n; i++) {
            this.sw.push(new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4)));
            this.swColor.push(this.greens[Math.floor(Math.random() * this.greens.length)]);
        }

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
        var color1 = Math.floor(Math.random() * 8);
        var color2 = Math.floor(Math.random() * 8);
        var color3 = Math.floor(Math.random() * 8);


        this.green1 = new CGFappearance(this.scene);
        this.green1.setAmbient(this.greens[color1][0] / 256, this.greens[color1][1] / 256, this.greens[color1][2] / 256, 0.5);
        this.green1.setDiffuse(this.greens[color1][0] / 256, this.greens[color1][1] / 256, this.greens[color1][2] / 256, 0.5);


        this.green2 = new CGFappearance(this.scene);
        this.green2.setAmbient(this.greens[color2][0] / 256, this.greens[color2][1] / 256, this.greens[color2][2] / 256, 0.5);
        this.green2.setDiffuse(this.greens[color2][0] / 256, this.greens[color2][1] / 256, this.greens[color2][2] / 256, 0.5);


        this.green3 = new CGFappearance(this.scene);
        this.green3.setAmbient(this.greens[color3][0] / 256, this.greens[color3][1] / 256, this.greens[color3][2] / 256, 0.5);
        this.green3.setDiffuse(this.greens[color3][0] / 256, this.greens[color3][1] / 256, this.greens[color3][2] / 256, 0.5);

        this.greens = [this.green1, this.green2, this.green3];
    }

    randomRotation(){
        this.scene.scale(Math.random()*1-0.5,0,(Math.random()*1-0.5));
        this.scene.rotate((Math.random() * Math.PI),0, 0,1);
    }

    display() {
        for (let i = 0; i < this.n; i++) {
            this.swColor[i].apply();
            this.scene.pushMatrix();
            this.scene.translate(this.positions[i][0], this.positions[i][1], this.positions[i][2]);
            this.sw[i].display();
            this.scene.popMatrix();
        }
    }
}

