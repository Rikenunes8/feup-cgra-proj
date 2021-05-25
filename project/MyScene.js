import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader} from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MyCubeMap } from "./geometries/MyCubeMap.js";
import { MyMovingFish } from "./sceneElements/MyMovingFish.js";
import {MySeaFloor} from "./sceneElements/MySeaFloor.js";
import {MyWaterSurface} from "./sceneElements/MyWaterSurface.js";
import { MyNest } from "./sceneElements/MyNest.js";
import { MyPilar } from "./sceneElements/MyPilar.js";
import { MyRocketSet } from "./sceneElements/MyRockSet.js";
import { MySeaWeedSet } from "./sceneElements/MySeaWeedSet.js";
import { MyAnimatedFish } from "./sceneElements/MyAnimatedFish.js";
import { MyPilarSet } from "./sceneElements/MyPilarSet.js";

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

    initCameras() {
        // this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    initLights() {
        this.setGlobalAmbientLight(0.2, 0.2, 0.3, 1.0);

        this.lights[0].setPosition(-5.0, 9.0, 1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
   
    initAppearances() {
        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);

        this.rockAppearence = new CGFappearance(this);
        this.rockAppearence.setAmbient(0.1,0.1,0.1,1);
        this.rockAppearence.setDiffuse(0.1,0.1,0.1,1);
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
        this.roof = 10;
        this.floor = 0;

        this.axis = new CGFaxis(this);
        this.fish = new MyMovingFish(this);
        this.seaFloor = new MySeaFloor(this, 50, 50, 1.0);
        this.waterSurface = new MyWaterSurface(this, 50, 50);
        this.rocketSet = new MyRocketSet(this, 40, 230, -230, 230, -230, 10, 5, 10, 5, 90, 0);
        this.seaWeedSet = new MySeaWeedSet(this, 30, 230, -230, 230, -230);
        this.nest = new MyNest(this, 1, -10, 14);
        
        var pilarsX = [8, 22, 8, 22];
        var pilarsZ = [0, 0, -5, -5];
        this.pilarsSet = new MyPilarSet(this, pilarsX, pilarsZ);

        this.shoal = [];
        for (let i = 0; i < 0; i++) {
          this.shoal.push(new MyAnimatedFish(this, 5, 20, -20, 20, -20, 8, 2, 10, 4));
        }

        this.cubeMap = new MyCubeMap(this, 500);
        this.cubeMap.setTextures(this.cubeTextures[this.selectedCubeTexture]);

        this.rocksFalling = [];
    }

    initInterfaceObjects() {
        this.displayAxis = false;
        this.speedFactor = 1;
        this.scaleFactor = 1;
    
        this.displayWorld = true;
        this.displayFish = true;
        this.displaySeaFloor = true;
        this.displayWaterSurface = true;
        this.displayPilars = true;
        this.displayRocks = true;
        this.displaySeaWeed = true;
        this.displayShoal = true;

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
        this.fish.update();
        this.waterSurface.update(t);
        for (let i = 0; i < this.rocksFalling.length; i++) {
            this.rocksFalling[i].update(this.nest.x, this.nest.y, this.nest.z, this.nest.radius, this.rocketSet.rocks);
        }
        for (let i = 0; i < this.shoal.length; i++) {
          this.shoal[i].update();
        }
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
            this.turn(Math.PI / 32);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.turn(-Math.PI / 32);
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.goUpAndDown(1);
        }
        if (this.gui.isKeyPressed("KeyL")) {
            this.goUpAndDown(-1);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.reset();
        }
        if (this.gui.isKeyPressed("KeyC")) {
            this.pickAndDropRock();
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

        // ----- Pilars
        if (this.displayPilars) {
            this.pilarsSet.display();
        }

        // ---- Rocks
        if (this.displayRocks) {
            this.rocketSet.display();
        }

        //--------Sea Weed
        if(this.displaySeaWeed){
            this.seaWeedSet.display();
        }
        
        // ------Sea Floor
        if(this.displaySeaFloor){
            // ------- Nest
            this.pushMatrix();
            this.nest.display();
            this.popMatrix();
            // -------------
            this.pushMatrix();
            this.seaFloor.display();
            this.popMatrix();
        }

        // ----- Water Surface
        if (this.displayWaterSurface) {
            this.pushMatrix();
            this.waterSurface.display();
            this.popMatrix();
        }
        
        // ----- Fish
        if (this.displayFish) {
            this.pushMatrix();
            this.fish.display();
            this.popMatrix();
        }

        // ----- Shoal
        if (this.displayShoal) {
          for (let i = 0; i < this.shoal.length; i++) {
            this.pushMatrix();
            this.shoal[i].display();
            this.popMatrix();
          }
        }


        // ---- END Primitive drawing section ------
    }

    turn(ang) {
        this.fish.ang += ang;
        
        if (ang > 0)
            this.fish.turningLeft = true;
        else if (ang < 0)
            this.fish.turningRight = true;
    }

    accelerate(vel) {
        this.fish.vel += vel;
    }

    reset() {
        this.fish.reset();
    }

    goUpAndDown(ori) {
        this.fish.yVel = ori * this.fish.Y_VEL_MAX;
    }

    pickAndDropRock() {
        var pos = this.fish.getPosition();
        if (this.fish.isFree()) {
            if (this.fish.isInLimInf()) {
                this.fish.pickRock(this.rocketSet.getClosestRock(pos[0], pos[2]));
            }
        }
        else {
            this.fish.dropRock();
        }
    }

    generateRandom(max, min, prec) { // Max and min both included
        return (Math.floor(Math.random() * (max - min + 1) ) + min)/prec;
    }
}