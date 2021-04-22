import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader} from "../lib/CGF.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyTriangle } from './MyFish/MyTriangle.js';
import { MyMovingObject } from "./MyMovingObject.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MySphere } from "./MySphere.js";
import {MySeaFloor} from "./MySeaFloor/MySeaFloor.js";

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
        this.orientedObject = new MyMovingObject(this, new MyTriangle(this));
        this.cubeMap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this, 12);
        this.fish = new MyMovingFish(this);
        this.seaFloor = new MySeaFloor(this);

        // Initialize scene Appearances
        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
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
        
        this.earthAppearance = new CGFappearance(this);
        this.earthAppearance.setAmbient(0, 0, 0, 1);
        this.earthAppearance.setDiffuse(0, 0, 0, 1);
        this.earthAppearance.setSpecular(0, 0, 0, 1);
        this.earthAppearance.setEmission(1, 1, 1, 1);
        this.earthAppearance.setShininess(10.0);
        this.earthAppearance.loadTexture('images/earth.jpg');
        this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');
        
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
        
        this.textureCustomNX = new CGFtexture(this, 'images/custom_cubemap/nx.png');
        this.textureCustomNY = new CGFtexture(this, 'images/custom_cubemap/ny.png');
        this.textureCustomNZ = new CGFtexture(this, 'images/custom_cubemap/nz.png');
        this.textureCustomPX = new CGFtexture(this, 'images/custom_cubemap/px.png');
        this.textureCustomPY = new CGFtexture(this, 'images/custom_cubemap/py.png');
        this.textureCustomPZ = new CGFtexture(this, 'images/custom_cubemap/pz.png');
        this.textureCustom = [this.textureCustomNX, this.textureCustomNY, this.textureCustomNZ, this.textureCustomPX, this.textureCustomPY, this.textureCustomPZ];



        this.sandAppearance = new CGFappearance(this);
        this.sandAppearance.setAmbient(0, 0, 0, 1);
        this.sandAppearance.setDiffuse(0, 0, 0, 1);
        this.sandAppearance.setSpecular(0, 0, 0, 1);
        this.sandAppearance.setEmission(1, 1, 1, 1);
        this.sandAppearance.setShininess(10.0);
        this.sandTex= new CGFtexture(this,"./images/sand.png");
        this.sandMap = new CGFtexture(this, "./images/sandMap.png");
        this.sandAppearance.setTexture(this.sandTex);

        this.sandShader = new CGFshader(this.gl, "./MySeaFloor/sand.vert", "./MySeaFloor/sand.frag");
        this.sandShader.setUniformsValues({ uSampler2: 2 });
        
        // Set initial cube texture (comment one of the following lines)
        //this.cubeMap.initTextures(this.textureTest);
        this.cubeTextures = [this.textureTest, this.textureDemo, this.textureCustom];
        this.selectedCubeTexture = 2;
        this.texturesList = {
            'Test' : 0,
            'Moutain' : 1,
            'Desert' : 2
        }
        this.cubeMap.setTextures(this.cubeTextures[this.selectedCubeTexture]);
        
        // Objects connected to MyInterface
        this.displayAxis = true;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.displayWorld = true;
        this.displayCylinder = false;
        this.cylinderComplexity = 12;
        this.displaySphere = false;
        this.displayObject = false;
        this.displayFish = true;
        this.displaySeaFloor = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.camera = new CGFcamera(2, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));

    }

    onCylinderComplexityChanged() {
        this.cylinder.updateBuffers(this.cylinderComplexity);
    }
    onSelectedCubeTextureChanged() {
        this.cubeMap.setTextures(this.cubeTextures[this.selectedCubeTexture]);
    }


    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.orientedObject.update();
        this.fish.update();
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.accelerate(0.05);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.accelerate(-0.05);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.turn(Math.PI / 36);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.turn(-Math.PI / 36);
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.fish.yVel = this.fish.yMaxVel;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            this.fish.yVel = -this.fish.yMaxVel;
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

        // ---- BEGIN Primitive drawing section -------


        // ----- Cubo de base
        if (this.displayWorld) {
            this.pushMatrix();
            this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2])
            this.cubeMap.display();
            this.popMatrix();
        }
        // -----------------------

        // ----- Objeto controlável
        if (this.displayObject) {
            this.setDefaultAppearance();
            this.pushMatrix();
            this.orientedObject.applyMovement();
            this.translate(0, 0, -0.5);
            this.rotate(Math.PI, 0, 1, 0);
            this.rotate(-Math.PI/2, 1, 0, 0);
            this.orientedObject.display();
            this.popMatrix();
        }
        // -------------------

        // ----- Fish
        if (this.displayFish) {
          this.pushMatrix();
          this.fish.display();
          this.popMatrix();
        }
        
        // ------Sea Floor
        if(this.displaySeaFloor){
            this.pushMatrix();
            this.sandAppearance.apply();
            this.setActiveShader(this.sandShader);
            this.sandMap.bind(2);
            this.translate(0, -5, 0);
            this.seaFloor.display();
            this.setActiveShader(this.defaultShader);
            this.popMatrix();
        }
        // ------------------

        // ------ Cylinder
        if (this.displayCylinder) {
          this.earthAppearance.apply()
          this.cylinder.display();
        }


        // ------ Sphere
        if (this.displaySphere) {
          this.earthAppearance.apply()
          this.incompleteSphere.display();
        }
        // ----------------------------

        // ---- END Primitive drawing section ------
    }

    turn(ang) {
        this.orientedObject.ang += ang;
        this.fish.ang += ang;
    }

    accelerate(vel) {
        this.orientedObject.vel += vel;
        this.fish.vel += vel;

    }
    reset() {
      this.orientedObject.pos = [0, 0, 0];
      this.orientedObject.ang = 0;
      this.orientedObject.vel = 0;

      this.fish.pos = [0, 0, 0];
      this.fish.ang = 0;
      this.fish.vel = 0;

    }
}