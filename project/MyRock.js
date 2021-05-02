import {CGFobject} from '../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   * @param  {integer} offset - offset maximum to apply to each vertice (e.g. offset = 20, maximum offset is 0.20)
   */
  constructor(scene, slices, stacks, offset) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.offset = offset;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    var firstLatVerX;
    var firstLatVerY;
    var firstLatVerZ;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        
        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }
        
        if (longitude != this.longDivs) {
          var ran = Math.floor(Math.random()*this.offset*2-this.offset)/100;
          var xPos = x+(x*ran);
          var yPos = y+(y*ran);
          var zPos = z+(z*ran);
          
          if (longitude == 0) {
            firstLatVerX = xPos;
            firstLatVerY = yPos;
            firstLatVerZ = zPos;
          }
          this.vertices.push(xPos, yPos, zPos);
        }
        else {
          this.vertices.push(firstLatVerX, firstLatVerY, firstLatVerZ);
        }
        
        //--- Normals
        this.normals.push(x, y, z);
        
        //--- Texture Coordinates
        this.texCoords.push(longitude/this.longDivs, latitude/this.latDivs);

        theta += thetaInc;
      }
      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
