import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from "./geometries/MyPlane.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {
    constructor(scene, nDivs, side, maxHeight) {
        super(scene);
        this.initAppearance(maxHeight);
        this.seaFloor = new MyPlane(this.scene, nDivs);
        this.side = side;
    }
    initAppearance(maxHeight) {
        this.sandAppearance = new CGFappearance(this.scene);
        this.sandAppearance.setAmbient(0, 0, 0, 1);
        this.sandAppearance.setDiffuse(0, 0, 0, 1);
        this.sandAppearance.setSpecular(0, 0, 0, 1);
        this.sandAppearance.setEmission(1, 1, 1, 1);
        this.sandAppearance.setShininess(10.0);
        this.sandTex= new CGFtexture(this.scene,"./images/sea_floor/sand.png");
        this.sandMap = new CGFtexture(this.scene, "./images/sea_floor/sandMap.png");
        this.sandAppearance.setTexture(this.sandTex);

        this.sandShader = new CGFshader(this.scene.gl, "./shaders/sand.vert", "./shaders/sand.frag");
        this.sandShader.setUniformsValues({ uSampler2: 2, heightScale: maxHeight });
    }

    displayFloor() {
        this.sandAppearance.apply();
        this.scene.setActiveShader(this.sandShader);
        this.sandMap.bind(2);
        //this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2])
        this.scene.translate(0, -24, 0);
        this.scene.scale(this.side, 1, this.side);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.seaFloor.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    display(){
        this.displayFloor();
    }
}