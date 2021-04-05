import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyTriangle } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.orientedObject = new MyTriangle(this);
        this.cubeMap = new MyCubeMap(this);

        // Initialize scene Appearances
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        this.cubeMaterial = new CGFappearance(this);
        this.cubeMaterial.setAmbient(0, 0, 0, 1);
        this.cubeMaterial.setDiffuse(0, 0, 0, 1);
        this.cubeMaterial.setSpecular(0, 0, 0, 1);
        this.cubeMaterial.setEmission(1, 1, 1, 1);
        this.cubeMaterial.setShininess(10.0);
        //this.cubeMaterial.loadTexture('images/default.png');
        this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        // Initialize textures
        this.textureNX = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.textureNY = new CGFtexture(this, 'images/test_cubemap/ny.png');
        this.textureNZ = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.texturePX = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.texturePY = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.texturePZ = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.textureTest = [this.textureNX, this.textureNY, this.textureNZ, this.texturePX, this.texturePY, this.texturePZ];

        this.textureDemoNX = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.textureDemoNY = new CGFtexture(this, 'images/demo_cubemap/bottom.png');
        this.textureDemoNZ = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.textureDemoPX = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.textureDemoPY = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.textureDemoPZ = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.textureDemo = [this.textureDemoNX, this.textureDemoNY, this.textureDemoNZ, this.textureDemoPX, this.textureDemoPY, this.textureDemoPZ];

        // Set initial cube texture (comment one of the following lines)
        //this.cubeMap.initTextures(this.textureTest);
        this.cubeMap.initTextures(this.textureDemo);


        //Objects connected to MyInterface
        this.displayAxis = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
        this.checkKeys();
        this.orientedObject.update();
    }

    checkKeys()  {
      
      // Check for key codes e.g. in https://keycode.info/
      if (this.gui.isKeyPressed("KeyW")) {
        this.accelerate(0.05);
      }
      if (this.gui.isKeyPressed("KeyS")) {
        this.accelerate(-0.05);
      }
      if (this.gui.isKeyPressed("KeyA")) {
        this.turn(Math.PI/36);
      }
      if (this.gui.isKeyPressed("KeyD")) {
        this.turn(-Math.PI/36);
      }
      if (this.gui.isKeyPressed("KeyR")) {
        this.reset();
      }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section -------
        
        // ----- Objeto controlável
        /*this.translate(this.orientedObject.pos[0],this.orientedObject.pos[1],this.orientedObject.pos[2])
        this.rotate(this.orientedObject.ang, 0, 1, 0);

        this.translate(0, 0, -0.5);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.rotate(Math.PI/4, 0, 0, 1);
        this.orientedObject.display();*/
        // -------------------


        // ----- Cubo de base
        this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2])
        this.cubeMap.display();
        // -----------------------


        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();

        // ---- END Primitive drawing section ------
    }

    turn(ang) {
        this.orientedObject.ang += ang;
    }

    accelerate(vel) {
        this.orientedObject.vel += vel;
    }
    reset() {
        this.orientedObject.pos = [0, 0, 0];
        this.orientedObject.ang = 0;
        this.orientedObject.vel = 0;
    }
}