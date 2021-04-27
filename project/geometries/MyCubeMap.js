import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyQuad } from './MyQuad.js';
/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene, scale) {
		super(scene);
    this.scale = scale;
    this.quad = new MyQuad(scene);
    this.initMaterial();
	}

  initMaterial() {
    this.cubeMaterial = new CGFappearance(this.scene);
    this.cubeMaterial.setAmbient(0, 0, 0, 1);
    this.cubeMaterial.setDiffuse(0, 0, 0, 1);
    this.cubeMaterial.setSpecular(0, 0, 0, 1);
    this.cubeMaterial.setEmission(1, 1, 1, 1);
    this.cubeMaterial.setShininess(10.0);
  }

  // textures is array [left, down, back, right, up, front]
  setTextures(textures) {
    this.left = textures[0];
    this.down = textures[1];
    this.back = textures[2];
    this.right = textures[3];
    this.up = textures[4];
    this.front = textures[5];
  }
  set_filter_apply(texture) {
    this.cubeMaterial.setTexture(texture);
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    this.cubeMaterial.apply();
  }

  display() {
    
    this.set_filter_apply(this.front);
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5*this.scale);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

    this.set_filter_apply(this.back);
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -0.5*this.scale);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

    this.set_filter_apply(this.right);
    this.scene.pushMatrix();
    this.scene.translate(0.5*this.scale, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

    this.set_filter_apply(this.left);
    this.scene.pushMatrix();
    this.scene.translate(-0.5*this.scale, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

    this.set_filter_apply(this.down);
    this.scene.pushMatrix();
    this.scene.translate(0, -0.5*this.scale, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

    this.set_filter_apply(this.up);
    this.scene.pushMatrix();
    this.scene.translate(0, 0.5*this.scale, 0);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

  }
}
