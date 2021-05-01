import {CGFobject} from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   */
  constructor(scene, slices, yDivs) {
    super(scene);
    this.slices = slices;
    this.yDivs = yDivs;
    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var theta = 0;
    var thetaInc = (2 * Math.PI) / this.slices;
    
    for (let lat=0; lat <= 1; lat++) {
      theta = 0;
      for (let lon = 0; lon <= this.slices; lon++) {
        //--- Vertices coordinates
        var x = Math.cos(theta);
        var y = 1-lat;
        var z = -Math.sin(theta);
        this.vertices.push(x, y, z);
        
        //--- Indices
        if (lat == 0 && lon < this.slices) {
          var current = lat * (this.slices+1) + lon;
          var next = current + (this.slices+1);
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }
        this.texCoords.push(lon/this.slices, lat*(this.yDivs));
        this.normals.push(x, 0, z);
        theta += thetaInc;
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
   updateBuffers(complexity){
    this.slices = Math.round(complexity); //complexity varies 3-16, so slices varies 3-16

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
}
}
