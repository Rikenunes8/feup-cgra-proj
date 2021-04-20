import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
      // call CGFinterface init
      super.init(application);
      // init GUI. For more information on the methods, check:
      // http://workshop.chromeexperiments.com/examples/gui
      this.gui = new dat.GUI();
      
      var obj = this;

      //Checkbox element in GUI
      this.gui.add(this.scene, 'displayAxis').name('Display Axis');
      
      this.gui.add(this.scene,'speedFactor',0.1,3).name('Scene speed');
      this.gui.add(this.scene,'scaleFactor',0.5,3).name('Scale Factor');

      var world = this.gui.addFolder('World');
      world.add(this.scene, 'displayWorld').name('Display World');
      world.add(this.scene, 'selectedCubeTexture', this.scene.texturesList).onChange(this.scene.onSelectedCubeTextureChanged.bind(this.scene)).name('World Texture');

      this.gui.add(this.scene, 'displayObject').name('Display Object');
      this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
      this.gui.add(this.scene, 'displayFish').name('Display Fish');

      var cylinder = this.gui.addFolder('Cylinder');
      cylinder.add(this.scene, 'displayCylinder').name("Display Cylinder");
      cylinder.add(this.scene, 'cylinderComplexity', 3, 16).onChange(this.scene.onCylinderComplexityChanged.bind(this.scene)).name('Cylinder slices');


      this.initKeys();
      return true;
    }
    
    initKeys() {
      // create reference from the scene to the GUI
      this.scene.gui=this;
      
      // disable the processKeyboard funcition
      this.processKeyboard=function(){};
      
      // create a named array to store which keys are being pressed
      this.activeKeys={};
    }

    processKeyDown(event) {
      // called when a key is pressed down
      // mark it as active in the array
      this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
      // called when a key is released, mark it as inactive in the array
      this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
      if( this.activeKeys[keyCode] == true &&
        (keyCode == "keyL" || keyCode == "keyP")) {
          this.activeKeys[keyCode] = false;
          return true;
        }         
        return this.activeKeys[keyCode] || false;
    }






}