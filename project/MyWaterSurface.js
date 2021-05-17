import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from "./geometries/MyPlane.js";

/**
 * MyFish
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWaterSurface extends CGFobject {
    constructor(scene, nDivs, side) {
        super(scene);
        this.initAppearance();
        this.waterSurface = new MyPlane(this.scene, nDivs);
        this.side = side;
    }
    initAppearance() {
        this.waterAppearance = new CGFappearance(this.scene);
        this.waterAppearance.setAmbient(1, 1, 1, 1);
        this.waterAppearance.setDiffuse(1, 1, 1, 1);
        this.waterTex= new CGFtexture(this.scene,"./images/water_surface/pier.jpg");
        this.waterMap = new CGFtexture(this.scene, "./images/water_surface/distortionmap.png");
        this.waterAppearance.setTexture(this.waterTex);
        this.waterAppearance.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.waterShader = new CGFshader(this.scene.gl, "./shaders/water.vert", "./shaders/water.frag");
        this.waterShader.setUniformsValues({ uSampler2: 3 });
    }

    update(t) {
      this.waterShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

    display() {
        this.waterAppearance.apply();
        this.scene.setActiveShader(this.waterShader);
        this.waterMap.bind(3);
        this.scene.translate(0, this.scene.roof, 0);
        this.scene.scale(this.side, 1, this.side);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.waterSurface.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}