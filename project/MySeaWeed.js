import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./geometries/MyPyramid.js";

export class MySeaWeed extends CGFobject {
    constructor(scene, n) {
        super(scene);

        this.n = n;
        this.sw = [];
        for (let i = 0; i < n; i++) {
            this.sw.push(new MyPyramid(this.scene, 12, 1, (Math.floor(Math.random() * (12 - 4)) + 4)));
        }


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

        this.type = 6-this.n;
        this.initMaterials();
    }
    initMaterials() {
        var color1 = Math.floor(Math.random() * 8);
        var color2 = Math.floor(Math.random() * 8);
        var color3 = Math.floor(Math.random() * 8);


        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(this.greens[color1][0] / 256, this.greens[color1][1] / 256, this.greens[color1][2] / 256, 0.5);
        this.green.setDiffuse(this.greens[color1][0] / 256, this.greens[color1][1] / 256, this.greens[color1][2] / 256, 0.5);


        this.green2 = new CGFappearance(this.scene);
        this.green2.setAmbient(this.greens[color2][0] / 256, this.greens[color2][1] / 256, this.greens[color2][2] / 256, 0.5);
        this.green2.setDiffuse(this.greens[color2][0] / 256, this.greens[color2][1] / 256, this.greens[color2][2] / 256, 0.5);


        this.green3 = new CGFappearance(this.scene);
        this.green3.setAmbient(this.greens[color3][0] / 256, this.greens[color3][1] / 256, this.greens[color3][2] / 256, 0.5);
        this.green3.setDiffuse(this.greens[color3][0] / 256, this.greens[color3][1] / 256, this.greens[color3][2] / 256, 0.5);
    }

    randomRotation(){
        this.scene.scale(Math.random()*1-0.5,0,(Math.random()*1-0.5));
        this.scene.rotate((Math.random() * Math.PI),0, 0,1);
    }

    display() {
        if(this.type==0)
            this.display6();
        else if(this.type==1)
            this.display5();
        else if(this.type==2)
            this.display4();
        else if(this.type==3)
            this.display3();
    }

    display3() {
        this.green.apply();

        this.scene.pushMatrix();
        this.sw[0].display();
        this.scene.popMatrix();

        this.green2.apply();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, -1);
        this.sw[1].display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, -1);
        this.sw[2].display();
        this.scene.popMatrix();

    }

    display4() {
        this.green.apply();

        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 0);
        this.sw[3].display();
        this.scene.popMatrix();

        this.display3();

    }

    display5() {
        this.green3.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.sw[4].display();
        this.scene.popMatrix();

        this.display4();
    }

    display6() {
        this.green3.apply();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0);
        this.sw[5].display();
        this.scene.popMatrix();
        
        this.display5();

    }

}

