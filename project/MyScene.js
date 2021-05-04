import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader} from "../lib/CGF.js";
import { MyCubeMap } from "./geometries/MyCubeMap.js";
import { MySphere } from "./geometries/MySphere.js";
import { MyCylinder } from "./geometries/MyCylinder.js";
import { MyTriangle } from './geometries/MyTriangle.js';
import { MyMovingObject } from "./MyMovingObject.js";
import { MyMovingFish } from "./MyMovingFish.js";
import {MySeaFloor} from "./MySeaFloor.js";
import {MyWaterSurface} from "./MyWaterSurface.js";
import { MyNest } from "./MyNest.js";
import { MyPilar } from "./MyPilar.js";
import { MyRocketSet } from "./MyRockSet.js";
import{MySeaWeed} from "./MySeaWeed.js"
import { MySeaWeedSet } from "./MySeaWeedSet.js";

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

        this.initAppearances();
        this.initTextures();
        this.initSceneObjects();
        this.initInterfaceObjects();
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        //this.lights[0].setAmbient(0.4, 0.4, 0.4, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.camera = new CGFcamera(2, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));

    }
    
    initAppearances() {
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

        this.earthAppearance = new CGFappearance(this);
        this.earthAppearance.setAmbient(0, 0, 0, 1);
        this.earthAppearance.setDiffuse(0, 0, 0, 1);
        this.earthAppearance.setSpecular(0, 0, 0, 1);
        this.earthAppearance.setEmission(1, 1, 1, 1);
        this.earthAppearance.setShininess(10.0);
        this.earthAppearance.loadTexture('images/earth.jpg');
        this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initTextures() {
        this.textureNX = new CGFtexture(this, 'images/cubemap/test_cubemap/nx.png');
        this.textureNY = new CGFtexture(this, 'images/cubemap/test_cubemap/ny.png');
        this.textureNZ = new CGFtexture(this, 'images/cubemap/test_cubemap/nz.png');
        this.texturePX = new CGFtexture(this, 'images/cubemap/test_cubemap/px.png');
        this.texturePY = new CGFtexture(this, 'images/cubemap/test_cubemap/py.png');
        this.texturePZ = new CGFtexture(this, 'images/cubemap/test_cubemap/pz.png');
        this.textureTest = [this.textureNX, this.textureNY, this.textureNZ, this.texturePX, this.texturePY, this.texturePZ];

        this.textureDemoNX = new CGFtexture(this, 'images/cubemap/demo_cubemap/left.png');
        this.textureDemoNY = new CGFtexture(this, 'images/cubemap/demo_cubemap/bottom.png');
        this.textureDemoNZ = new CGFtexture(this, 'images/cubemap/demo_cubemap/back.png');
        this.textureDemoPX = new CGFtexture(this, 'images/cubemap/demo_cubemap/right.png');
        this.textureDemoPY = new CGFtexture(this, 'images/cubemap/demo_cubemap/top.png');
        this.textureDemoPZ = new CGFtexture(this, 'images/cubemap/demo_cubemap/front.png');
        this.textureDemo = [this.textureDemoNX, this.textureDemoNY, this.textureDemoNZ, this.textureDemoPX, this.textureDemoPY, this.textureDemoPZ];

        this.textureCustomNX = new CGFtexture(this, 'images/cubemap/custom_cubemap/nx.png');
        this.textureCustomNY = new CGFtexture(this, 'images/cubemap/custom_cubemap/ny.png');
        this.textureCustomNZ = new CGFtexture(this, 'images/cubemap/custom_cubemap/nz.png');
        this.textureCustomPX = new CGFtexture(this, 'images/cubemap/custom_cubemap/px.png');
        this.textureCustomPY = new CGFtexture(this, 'images/cubemap/custom_cubemap/py.png');
        this.textureCustomPZ = new CGFtexture(this, 'images/cubemap/custom_cubemap/pz.png');
        this.textureCustom = [this.textureCustomNX, this.textureCustomNY, this.textureCustomNZ, this.textureCustomPX, this.textureCustomPY, this.textureCustomPZ];

        this.texUnderwaterNX = new CGFtexture(this, 'images/cubemap/underwater_cubemap/left.jpg');
        this.texUnderwaterNY = new CGFtexture(this, 'images/cubemap/underwater_cubemap/bottom.jpg');
        this.texUnderwaterNZ = new CGFtexture(this, 'images/cubemap/underwater_cubemap/back.jpg');
        this.texUnderwaterPX = new CGFtexture(this, 'images/cubemap/underwater_cubemap/right.jpg');
        this.texUnderwaterPY = new CGFtexture(this, 'images/cubemap/underwater_cubemap/top.jpg');
        this.texUnderwaterPZ = new CGFtexture(this, 'images/cubemap/underwater_cubemap/front.jpg');
        this.texUnderwater = [this.texUnderwaterNX, this.texUnderwaterNY, this.texUnderwaterNZ, this.texUnderwaterPX, this.texUnderwaterPY, this.texUnderwaterPZ];


        // Set initial cube texture (comment one of the following lines)
        //this.cubeMap.initTextures(this.textureTest);
        this.cubeTextures = [this.textureTest, this.textureDemo, this.textureCustom, this.texUnderwater];
        this.selectedCubeTexture = 3;
        this.texturesList = {
            'Test': 0,
            'Moutain': 1,
            'Desert': 2,
            'Water': 3
        };
    }

    initSceneObjects() {
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.orientedObject = new MyMovingObject(this, new MyTriangle(this));
        this.cylinder = new MyCylinder(this, 12, 1);
        this.fish = new MyMovingFish(this);
        this.seaFloor = new MySeaFloor(this, 50, 50, 1.0);
        this.waterSurface = new MyWaterSurface(this, 50, 50, 20);
        this.pilar1 = new MyPilar(this, 8, 0);
        this.pilar2 = new MyPilar(this, 22, 0);
        this.pilar3 = new MyPilar(this, 8, -5);
        this.pilar4 = new MyPilar(this, 22, -5);
        this.rocketSet = new MyRocketSet(this, 10, 23, -23, 23, -23, 10, 5, 10, 5, 90, 0);
        this.seaWeedSet = new MySeaWeedSet(this,15);

        this.cubeMap = new MyCubeMap(this, 500);
        this.cubeMap.setTextures(this.cubeTextures[this.selectedCubeTexture]);

        this.nest = new MyNest(this, 5);
    }

    initInterfaceObjects() {
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
        this.displayWaterSurface = true;
        this.displayPilars = true;
        this.displayRocks = true;
        this.displaySeaWeed =true;
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
        this.waterSurface.update(t);
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
          this.seaFloor.display();
          this.popMatrix();
          // ------- Nest
          this.pushMatrix();
          this.nest.display();
          this.popMatrix();
          // -------------
        }
        // ------------------

        // ----- Water Surface
        if (this.displayWaterSurface) {
            this.pushMatrix();
            this.waterSurface.display();
            this.popMatrix();
        }

        if (this.displayPilars) {
          this.pushMatrix();
          this.pilar1.display();
          this.popMatrix();
          this.pushMatrix();
          this.pilar2.display();
          this.popMatrix();
          this.pushMatrix();
          this.pilar3.display();
          this.popMatrix();
          this.pushMatrix();
          this.pilar4.display();
          this.popMatrix();
        }

        if (this.displayRocks) {
          this.pushMatrix();
          this.rocketSet.display();
          this.popMatrix();
        }

        //--------Sea Weed
        if(this.displaySeaWeed){
            this.pushMatrix();
            this.seaWeedSet.display();
            this.popMatrix();
        }
    
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